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
						<a href="#" onclick="editRow()">
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
			})
	}
}


function editRow() {

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
		})
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
