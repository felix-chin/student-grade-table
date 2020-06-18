var formElement = document.querySelector('form');
var gradeForm = new GradeForm(formElement);
var headerElement = document.querySelector('header');
var pageHeader = new PageHeader(headerElement);
var tableElement = document.querySelector('table');
var noGradesElement = document.querySelector('p');
var gradeTable = new GradeTable(tableElement, noGradesElement);
var gradeId = null;
var gradesArray = [];
var gradeObj = {};
var app = new App(gradeTable, pageHeader, gradeForm, gradeId, gradesArray, gradeObj);
app.start()
