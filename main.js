var form = document.querySelector('form');
var gradeForm = new GradeForm(form);
var header = document.querySelector('header');
var pageHeader = new PageHeader(header);
var table = document.querySelector('table');
var p = document.querySelector('p');
var gradeTable = new GradeTable(table, p);
var app = new App(gradeTable, pageHeader, gradeForm);
app.start()
