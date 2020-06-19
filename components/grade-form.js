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
    const addButton = document.getElementById('add');
    const addHeader = document.querySelector('h4');
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const course = formData.get('course');
    const grade = formData.get('grade');
    if (addButton.textContent === 'Add') {
      this.createGrade(name, course, grade);
    } else {
      this.patchGrade(undefined, name, course, grade);
      addButton.textContent = 'Add';
      addHeader.textContent = 'Add Grade';
    }
    event.target.reset();
  }
}
