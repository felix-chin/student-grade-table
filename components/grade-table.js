class GradeTable {
  constructor(tableElement) {
    this.tableElement = tableElement;
  }
  updateGrades(grades) {
    var tbody = this.tableElement.querySelector('tbody');
    tbody.textContent = '';
    for(var i = 0; i < grades.length; i++){
      var row = document.createElement('tr');
      var student = document.createElement('td');
      var course = document.createElement('td');
      var grade = document.createElement('td');
      student.textContent = grades[i].name;
      course.textContent = grades[i].course;
      grade.textContent = grades[i].grade;
      row.append(student, course, grade);
      tbody.appendChild(row);
    }
    console.log(grades);
  }
  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }
  renderGradeRow(data, deleteGrade) {
    var tbody = this.tableElement.querySelector('tbody');
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
