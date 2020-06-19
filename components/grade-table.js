

class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }
  updateGrades(grades) {
    this.tableElement.lastElementChild.textContent = '';
    for(let i = 0; i < grades.length; i++){
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
    const row = document.createElement('tr');
    const student = document.createElement('td');
    const course = document.createElement('td');
    const grade = document.createElement('td');
    const buttons = document.createElement('td');
    const delButton = document.createElement('button');
    const delIcon = document.createElement('i');
    const editButton = document.createElement('button');
    const editIcon = document.createElement('i');
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
  }
}
