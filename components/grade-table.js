

class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }
  updateGrades(grades) {
    this.tableElement.lastElementChild.textContent = '';
    for(var i = 0; i < grades.length; i++){
      this.renderGradeRow(grades[i], this.deleteGrade)
    }
    if(grades.length < 1) {
      this.noGradesElement.className = '';
    } else {
      this.noGradesElement.className = 'd-none';
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
    var del = document.createElement('td');
    var button = document.createElement('button');
    student.textContent = data.name;
    course.textContent = data.course;
    grade.textContent = data.grade;
    del.className = "text-right"
    button.textContent = 'DELETE';
    button.className = 'btn btn-danger py-1 px-2'
    del.appendChild(button);
    row.append(student, course, grade, del);
    this.tableElement.lastElementChild.appendChild(row);
    button.addEventListener('click', function() {
      deleteGrade(data.id);
    });
    return row;
  }
}
