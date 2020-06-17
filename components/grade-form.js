class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
  }
  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }
  onPatch(patchGrade) {
    this.patchGrade = patchGrade;
  }

  handleSubmit(event) {
    event.preventDefault();
    var addButton = document.getElementById('add');
    var addHeader = document.querySelector('h4');
    var formData = new FormData(event.target);
    var id = formData.get('id');
    var name = formData.get('name');
    var course = formData.get('course');
    var grade = formData.get('grade');
    if (addButton.textContent === 'Add') {
      this.createGrade(name, course, grade);
      console.log("testing add");
    } else {
      this.patchGrade(id, name, course, grade);
      addButton.textContent = 'Add';
      addHeader.textContent = 'Add Grade';
      console.log("testing edit");
    }
    event.target.reset();
  }
}
