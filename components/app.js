class App {
  constructor(gradeTable, pageHeader, gradeForm, gradeId, gradesArray, gradeObj) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.patchGrade = this.patchGrade.bind(this);
    this.handlePatchGradeError = this.handlePatchGradeError.bind(this);
    this.handlePatchGradeSuccess = this.handlePatchGradeSuccess.bind(this);
    this.editGrade = this.editGrade.bind(this);
    this.refreshGradesTable = this.refreshGradesTable.bind(this);
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.gradeId = gradeId;
    this.gradesArray = gradesArray;
    this.gradeObj = gradeObj;
  }
  refreshGradesTable(grades) {
    this.gradeTable.updateGrades(grades);
    let sum = null;
    let average = null;
    for (let i = 0; i < grades.length; i++) {
      sum += grades[i].grade;
    }
    if (isNaN(sum / grades.length)) {
      average = 'N/A';
    } else {
      average = Math.floor(sum / grades.length);
    }
    this.pageHeader.updateAverage(average);
  }
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradesArray = grades;
    this.refreshGradesTable(grades);
  }
  getGrades() {
    $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: {
        "X-Access-Token": "cJdQkJZi"
      },
      error: this.handleGetGradesError,
      success: this.handleGetGradesSuccess
    })
  }
  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade);
    this.gradeForm.onPatch(this.patchGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onEditClick(this.editGrade);
  }
  handleCreateGradeError(error) {
    console.error(error);
  }
  handleCreateGradeSuccess(data) {
    data.grade = Number(data.grade);
    this.gradeObj = data;
    this.gradesArray.push(this.gradeObj);
    this.refreshGradesTable(this.gradesArray);
  }
  createGrade(name, course, grade) {
    $.ajax({
      method: "POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      data: {
        "name": name,
        "course": course,
        "grade": grade
      },
      headers: {
        "X-Access-Token": "cJdQkJZi"
      },
      error: this.handleCreateGradeError,
      success: this.handleCreateGradeSuccess
    })
  }
  handleDeleteGradeError(error) {
    console.error(error);
  }
  handleDeleteGradeSuccess(id) {
    const newArray = [];
    for (let i = 0; i < this.gradesArray.length; i++) {
      if (this.gradesArray[i].id !== id) {
        newArray.push(this.gradesArray[i]);
      }
    }
    this.gradesArray = newArray;
    this.refreshGradesTable(this.gradesArray);
  }
  deleteGrade(id) {
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: {
        "X-Access-Token": "cJdQkJZi"
      },
      error: this.handleDeleteGradeError,
      success: this.handleDeleteGradeSuccess(id)
    })
    console.log(id);
  }
  handlePatchGradeError(error) {
    console.error(error);
  }
  handlePatchGradeSuccess(data) {
    for (let i = 0; i < this.gradesArray.length; i++) {
      if (this.gradesArray[i].id === Number(data.id)) {
        this.gradesArray[i].name = data.name;
        this.gradesArray[i].course = data.course;
        this.gradesArray[i].grade = Number(data.grade);
        break;
      }
    }
    this.refreshGradesTable(this.gradesArray);
  }
  patchGrade(id, name, course, grade) {
    id = this.gradeId;
    $.ajax({
      method: "PATCH",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      data: {
        "name": name,
        "course": course,
        "grade": grade
      },
      headers: {
        "X-Access-Token": "cJdQkJZi"
      },
      error: this.handlePatchGradeError,
      success: this.handlePatchGradeSuccess
    })
  }
  editGrade(id, name, course, grade) {
    const idInput = document.getElementById('id');
    const nameInput = document.getElementById('name');
    const courseInput = document.getElementById('course');
    const gradeInput = document.getElementById('grade');
    const addButton = document.getElementById('add');
    const editButton = document.getElementById('edit');
    const addHeader = document.querySelector('h4');
    this.gradeId = id;
    nameInput.value = name;
    courseInput.value = course;
    gradeInput.value = grade;
    addHeader.textContent = 'Update Grade';
    addButton.textContent = 'Edit';
  }
}
