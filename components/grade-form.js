class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
  }
  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("test message");
  }
}
