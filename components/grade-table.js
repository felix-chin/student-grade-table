

class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }
  updateGrades(grades) {
    this.tableElement.lastElementChild.textContent = '';
    for(var i = 0; i < grades.length; i++){
      this.renderGradeRow(grades[i], this.deleteGrade, this.editGrade)
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
  onEditClick(editGrade) {
    this.editGrade = editGrade;
  }
  renderGradeRow(data, deleteGrade, editGrade) {
    var row = document.createElement('tr');
    var student = document.createElement('td');
    var course = document.createElement('td');
    var grade = document.createElement('td');
    var buttons = document.createElement('td');
    var delButton = document.createElement('button');
    var delIcon = document.createElement('i');
    var editButton = document.createElement('button');
    var editIcon = document.createElement('i');
    student.textContent = data.name;
    course.textContent = data.course;
    grade.textContent = data.grade;
    buttons.className = "text-right";
    delButton.setAttribute('type', 'button');
    delButton.className = 'btn btn-danger py-1 px-2 ml-2';
    delIcon.className = 'fas fa-trash-alt';
    editButton.setAttribute('type', 'button');
    editButton.className = 'btn btn-primary py-1 px-2 ml-2';
    editIcon.className = 'fas fa-edit';
    editButton.appendChild(editIcon)
    delButton.appendChild(delIcon)
    buttons.append(editButton, delButton);
    row.append(student, course, grade, buttons);
    this.tableElement.lastElementChild.appendChild(row);
    delButton.addEventListener('click', function() {
      deleteGrade(data.id);
    });
    editButton.addEventListener('click', function () {
      editGrade(data.id, data.name, data.course, data.grade)
    });
    return row;
  }
}
