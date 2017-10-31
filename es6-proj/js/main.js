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
    },
	{
		name: 'Shivang',
		rno: '1510991614',
		year: '2019',
		stream: 'CSE'
	},
	{
		name: 'Shubham Bansal',
		rno: '1510991628',
		year: '2019',
		stream: 'CSE'
	}
];


/* This function use ES6 Template Literals.
 * It creates the row in the HTML DOM.
 */
function createRow(student) {
    $('tbody').append(`<tr>
						<td>${student.name}</td>
						<td>${student.rno}</td>
						<td>${student.year}</td>
						<td>${student.stream}</td>
						<td><a href="#" onclick="deleteRow($(this))">
						<i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></a>
						<span> | </span>
						<a href="#" onclick="editRow($(this))">
						<i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a>
						<span> | </span>
						<a href="#" onclick="selectRow($(this))">
						<i class="fa fa-check fa-lg" aria-hidden="true"></i></a>
						</td>
						</tr>`)
}


/* This function passes the initial
 * students data to createRow() function.
 */
function initData() {
    for (let i = 0; i < students.length; i++) {
        createRow(students[i]);
    }
}


/* This function gets user input and creates a data entry.
 */
function addData() {
    let data = {};
	let $input = $('#myform').serializeArray();
	$.each($input,function(index, $object) {
		data[$object.name] = $object.value;
	});
	students.push(data);
	createRow(data);
	$('#myform')[0].reset();
	swal(
		'Added!',
		'The entry has been added!',
		'success'
	)
}


/* This function uses ES6 findIndex() and arrow function.
 * It deletes a row form table and that row data from students array.
 */
function deleteRow($element) {
	if($element.prevObject){
		let $tr = $element.parent().parent();
		let rno = $tr.children('td')[1].textContent;
		$tr.remove();
		let index = students.findIndex(student => student.rno == rno);
		students.splice(index,1);
	}
	else{
		swal({
			title: 'Are you sure?',
			text: 'You are about to delete an entry!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Delete!'
			}).then(function () {
				let $tr = $element.parent().parent();
				let rno = $tr.children('td')[1].textContent;
				$tr.remove();
				let index = students.findIndex(student => student.rno == rno);
				students.splice(index,1);
			}).catch(swal.noop)
	}
}


/* This function uses a form inside the swal window
 * to edit the entries in the table.
 */
function editRow($element) {
	let $tr = $element.parent().parent();
	let name = $tr.children('td')[0].textContent;
	let rno = $tr.children('td')[1].textContent;
	let year = $tr.children('td')[2].textContent;
	let stream = $tr.children('td')[3].textContent;
	swal({
		title: 'Edit Student Details :',
		html:`
			<form id="edit-form">
			<input type="text" class="swal2-input" name="name"
				placeholder="Name" value="${name}">
			<input type="text" class="swal2-input" name="rno"
				placeholder="Roll No." value="${rno}">
			<input type="text" class="swal2-input" name="year"
				placeholder="Passout Year" value="${year}">
			<input type="text" class="swal2-input" name="stream"
				placeholder="Stream" value="${stream}">
			</form>`,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Update!'
		}).then(function () {
			let data = {};
			let $input = $('#edit-form').serializeArray();
			$.each($input,function(index, $object) {
				data[$object.name] = $object.value;
			});
			let index = students.findIndex(student => student.rno == rno);
			students[index] = data;
			$tr.children('td:nth-child(1)').html(data.name);
			$tr.children('td:nth-child(2)').html(data.rno);
			$tr.children('td:nth-child(3)').html(data.year);
			$tr.children('td:nth-child(4)').html(data.stream);
			swal(
				'Entry Updated!',
				'success'
			)
		}).catch(swal.noop)
}


/* This function selects rows to delete by
 * adding table-danger class to the row.
 */
function selectRow($element) {
	let $tr = $element.parent().parent();
	$tr.toggleClass('table-danger');
	let $icon = $element.children();
	$icon.toggleClass('fa-check fa-times');
	toggleDelBtn();
}


/* This function calls deleteRow() to delete
 * multiple selected rows.
 */
function deleteSelected() {
	let $tr = $('tr.table-danger');
	swal({
		title: 'Are you sure?',
		text: `You are about to delete ${$tr.length} entries!`,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Confirm!'
		}).then(function () {
			$tr.each(function(index) {
				deleteRow($(this).children().children('a:first-child'));
			});
			toggleDelBtn();
			swal(
				'Deleted!',
				`${$tr.length} entries deleted!`,
				'success'
			)
		}).catch(swal.noop)
}


/* This function toggles the hidden attribute
 * of delete button.
 */
function toggleDelBtn() {
	if($('tr.table-danger').length) {
		$('#delbtn').removeAttr('hidden');
	}
	else {
		$('#delbtn').attr('hidden', 'true');
	}
}


/* This function checks for empty fields and
 * displays an alert if found.
 * Use of ES6 for...of loop.
 */
function checkEmpty(data){
	let pairs = Object.entries(data);
	for(let pair of pairs)
		if(pair[1] == ''){
			swal(
				'Empty fields found!',
				'There must be no empty fields.',
				'error'
			)
			return true;
		}
	return false;
}

