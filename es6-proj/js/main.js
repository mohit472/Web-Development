let students = [{
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


function createRow(student) {
    $('tbody').append(`<tr>
						<td>` + student.name + `</td>
						<td>` + student.rno + `</td>
						<td>` + student.year + `</td>
						<td>` + student.stream + `</td>
						<td><a href="#" onclick="deleteRow($(this))">
						<i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></a>
						<span> | </span>
						<a href="#" onclick="editRow()">
						<i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a></td>
						</tr>`)
}


function initData() {
    for (i = 0; i < students.length; i++) {
        createRow(students[i]);
    }
}


function addData() {
    let data = {};
	let input = $('#myform').serializeArray();
	$.each(input,function(index, object) {
		data[object.name] = object.value;
	});
	students.push(data);
	createRow(data);
	$('#myform')[0].reset();
}


function deleteRow(element) {
    let tr = element.parent().parent();
	let rno = tr.children('td')[1].textContent;
	tr.remove();
	for(let i = 0; i < students.length; i++)
		if(students[i].rno == rno)
			students.splice(i,1);
}


function editRow() {

}
