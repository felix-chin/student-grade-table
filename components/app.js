class App {
  constructor(gradeTable, pageHeader, gradeForm, gradesArray) {
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
    this.postGradesArray = this.postGradesArray.bind(this);
    this.deleteGradesArray = this.deleteGradesArray.bind(this);
    this.patchGradesArray = this.patchGradesArray.bind(this);
    this.refreshGradesTable = this.refreshGradesTable.bind(this);
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.gradesArray = gradesArray;
  }
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradesArray = grades;
    this.refreshGradesTable(grades);
  }
  refreshGradesTable(grades) {
    this.gradeTable.updateGrades(grades);
    var sum = null;
    var average = null;
    for (var i = 0; i < grades.length; i++) {
      sum += grades[i].grade;
    }
    if (isNaN(sum / grades.length)) {
      average = 'N/A';
    } else {
      average = Math.floor(sum / grades.length);
    }
    this.pageHeader.updateAverage(average);
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
      success: this.handleCreateGradeSuccess(name, course, grade)
    })
    console.log(name, course, grade);
  }
  handleCreateGradeError(error) {
    console.error(error);
  }
  handleCreateGradeSuccess(name, course, grade) {
    this.postGradesArray(name, course, grade);
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
  handleDeleteGradeError(error) {
    console.error(error);
  }
  handleDeleteGradeSuccess(id) {
    this.deleteGradesArray(id);
  }
  patchGrade(id, name, course, grade) {
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
      success: this.handlePatchGradeSuccess(id, name, course, grade)
    })
  }
  handlePatchGradeError(error) {
    console.error(error);
  }
  handlePatchGradeSuccess(id, name, course, grade) {
    this.patchGradesArray(id, name, course, grade);
  }
  editGrade(id, name, course, grade) {
    var idInput = document.getElementById('id');
    var nameInput = document.getElementById('name');
    var courseInput = document.getElementById('course');
    var gradeInput = document.getElementById('grade');
    var addButton = document.getElementById('add');
    var editButton = document.getElementById('edit');
    var addHeader = document.querySelector('h4');
    idInput.value = id;
    nameInput.value = name;
    courseInput.value = course;
    gradeInput.value = grade;
    addHeader.textContent = 'Update Grade';
    addButton.textContent = 'Edit';
  }
  postGradesArray(id, name, course, grade) {
    var gradeObject = {};
    gradeObject.id = Number(id);
    gradeObject.name = name;
    gradeObject.course = course;
    gradeObject.grade = Number(grade);
    this.gradesArray.push(gradeObject);
    this.refreshGradesTable(this.gradesArray);
  }
  deleteGradesArray(id) {
    var newArray = [];
    for(var i = 0; i < this.gradesArray.length; i++) {
      if(this.gradesArray[i].id !== id) {
        newArray.push(this.gradesArray[i]);
      }
    }
    this.gradesArray = newArray;
    this.refreshGradesTable();
  }
  patchGradesArray(id, name, course, grade) {
    for (var i = 0; i < this.gradesArray.length; i++) {
      if (this.gradesArray[i].id === Number(id)) {
        this.gradesArray[i].name = name;
        this.gradesArray[i].course = course;
        this.gradesArray[i].grade = Number(grade);
      }
    }
    this.refreshGradesTable(this.gradesArray);
  }
}
