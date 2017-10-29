/*jshint esversion: 6*/

let students = [
	{
		name: 'Surya Kant',
		rno: '1510991666',
		year: '2019',
		stream: 'CSE'
	},
	{
		name: 'Sparsh Rana',
		rno: '1510991658',
		year: '2019',
		stream: 'CSE'
	}
];


function createRow(student){
	$('tbody').append(`<tr>
						<td>` + student.name + `</td>
						<td>` + student.rno + `</td>
						<td>` + student.year + `</td>
						<td>` + student.stream + `</td>
						<td><a href="#" onclick="deleteRow(this)">delete</a>
						<span> </span>
						<a href="#" onclick="editRow()">edit</a></td>
						</tr>`)
}


function initData(){
	for(i=0; i < students.length; i++){
		createRow(students[i]);
	}
}


function addData(){
	let data = {};
	$.each($('#myform').serializeArray(), function(i, field) {
	    data[field.name] = field.value;
	});
	createRow(data);
	$('#myform')[0].reset();
}


function deleteRow(o) {
	let p = o.parentNode.parentNode;
	p.parentNode.removeChild(p);
}


function editRow(){

}
