var tbody = this.tableElement.querySelector('tbody');

class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }
  updateGrades(grades) {
    tbody.textContent = '';
    for(var i = 0; i < grades.length; i++){
      this.renderGradeRow(grades, this.deleteGrade)
    }
    console.log(grades);
  }
  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }
  renderGradeRow(data, deleteGrade) {
    var row = document.createElement('tr');
    var student = document.createElement('td');
    var course = document.createElement('td');
    var grade = document.createElement('td');
    var delButton = document.createElement('td');
    var button = document.createElement('button');
    student.textContent = data.name;
    course.textContent = data.course;
    grade.textContent = data.grade;
    button.textContent = 'DELETE';
    button.className = 'btn btn-danger'
    delButton.appendChild(button);
    row.append(student, course, grade, delButton);
    tbody.appendChild(row);
    button.addEventListener('click', deleteGrade(data.id));
    return row;
  }
}
