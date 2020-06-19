const formElement = document.querySelector('form');
const gradeForm = new GradeForm(formElement);
const headerElement = document.querySelector('header');
const pageHeader = new PageHeader(headerElement);
const tableElement = document.querySelector('table');
const noGradesElement = document.querySelector('p');
const gradeTable = new GradeTable(tableElement, noGradesElement);
const gradeId = null;
const gradesArray = [];
const gradeObj = {};
const app = new App(gradeTable, pageHeader, gradeForm, gradeId, gradesArray, gradeObj);
app.start()
