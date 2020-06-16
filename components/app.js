class App {
  constructor(gradeTable, pageHeader) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
  }
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);
    var sum = null;
    for (var i = 0; i < grades.length; i++) {
      sum += grades[i].grade;
    }
    var average = sum / grades.length;
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
      success: this.handleGetGradesSuccess,
    })
  }
  start() {
    this.getGrades();
  }
}
