class App {
  constructor() {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
  }
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    console.log(grades);
  }
  getGrades() {
    $.ajax({
      type: "GET",
      url: "https://github.com/Learning-Fuze/sgt_api#get-all-grades",
      error: this.handleGetGradesError,
      success: this.handleGetGradesSuccess
    })
  }
  start() {
    this.getGrades();
  }
}
