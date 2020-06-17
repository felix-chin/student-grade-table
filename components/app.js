class App {
  constructor(gradeTable, pageHeader, gradeForm) {
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
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
  }
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);
    var sum = null;
    var average = null;
    for (var i = 0; i < grades.length; i++) {
      sum += grades[i].grade;
    }
    if (isNaN(sum / grades.length)) {
      average = 'N/A';
    } else {
      average = sum / grades.length;
    }
    this.pageHeader.updateAverage(average);
  }
  getGrades() {
    $.ajax({
      type: "GET",
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
      type: "POST",
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
    console.log(name, course, grade);
  }
  handleCreateGradeError(error) {
    console.error(error);
  }
  handleCreateGradeSuccess() {
    this.getGrades();
  }
  deleteGrade(id) {
    $.ajax({
      type: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: {
        "X-Access-Token": "cJdQkJZi"
      },
      error: this.handleDeleteGradeError,
      success: this.handleDeleteGradeSuccess
    })
    console.log(id);
  }
  handleDeleteGradeError(error) {
    console.error(error);
  }
  handleDeleteGradeSuccess() {
    this.getGrades();
  }
  patchGrade(id, name, course, grade) {
    $.ajax({
      type: "PATCH",
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
    console.log(id);
  }
  handlePatchGradeError(error) {
    console.error(error);
  }
  handlePatchGradeSuccess() {
    this.getGrades();
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
}
