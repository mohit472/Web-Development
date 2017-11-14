'use strict';

var students = [{
	name: 'Surya Kant',
	rno: '1510991666',
	year: '2019',
	stream: 'CSE'
}, {
	name: 'Sparsh Rana',
	rno: '1510991658',
	year: '2019',
	stream: 'CSE'
}, {
	name: 'Shivang',
	rno: '1510991614',
	year: '2019',
	stream: 'CSE'
}, {
	name: 'Shubham Bansal',
	rno: '1510991628',
	year: '2019',
	stream: 'CSE'
}];

/* This function use ES6 Template Literals.
 * It creates the row in the HTML DOM.
 */
function createRow(student) {
	$('tbody').append('<tr>\n\t\t\t\t\t\t<td scope="row"></td>\n\t\t\t\t\t\t<td>' + student.name + '</td>\n\t\t\t\t\t\t<td>' + student.rno + '</td>\n\t\t\t\t\t\t<td>' + student.year + '</td>\n\t\t\t\t\t\t<td>' + student.stream + '</td>\n\t\t\t\t\t\t<td><a href="#" onclick="deleteRow($(this))">\n\t\t\t\t\t\t<i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></a>\n\t\t\t\t\t\t<span> | </span>\n\t\t\t\t\t\t<a href="#" onclick="editRow($(this))">\n\t\t\t\t\t\t<i class="fa fa-pencil fa-lg" aria-hidden="true"></i></a>\n\t\t\t\t\t\t<span> | </span>\n\t\t\t\t\t\t<a href="#" onclick="selectRow($(this))">\n\t\t\t\t\t\t<i class="fa fa-check fa-lg" aria-hidden="true"></i></a>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t</tr>');
}

/* This function passes the initial
 * students data to createRow() function.
 */
function initData() {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = students[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var student = _step.value;

			createRow(student);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	serialize();
}

/* This function gets user input and creates a data entry.
 */
function addData() {
	var data = {};
	var $input = $('#myform').serializeArray();
	$.each($input, function (index, $object) {
		data[$object.name] = $object.value;
	});
	data.name = data.name.trim();
	data.rno = data.rno.trim();
	data.year = data.year.trim();
	data.stream = data.stream.trim();
	if (checkEmpty(data) || validate(data)) return;
	students.push(data);
	createRow(data);
	serialize();
	$('#myform')[0].reset();
	swal('Added!', 'The entry has been added!', 'success');
}

/* This function uses ES6 findIndex() and arrow function.
 * It deletes a row form table and that row data from students array.
 */
function deleteRow($element) {
	if ($element.prevObject) {
		var $tr = $element.parent().parent();
		var rno = $tr.children('td')[1].textContent;
		$tr.remove();
		var index = students.findIndex(function (student) {
			return student.rno == rno;
		});
		students.splice(index, 1);
	} else {
		swal({
			title: 'Are you sure?',
			text: 'You are about to delete an entry!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Delete!'
		}).then(function () {
			var $tr = $element.parent().parent();
			var rno = $tr.children('td')[1].textContent;
			$tr.remove();
			var index = students.findIndex(function (student) {
				return student.rno == rno;
			});
			students.splice(index, 1);
			serialize();
		}).catch(swal.noop);
	}
}

/* This function uses a form inside the swal window
 * to edit the entries in the table.
 */
function editRow($element) {
	var $tr = $element.parent().parent();
	var name = $tr.children('td')[1].textContent;
	var rno = $tr.children('td')[2].textContent;
	var year = $tr.children('td')[3].textContent;
	var stream = $tr.children('td')[4].textContent;
	swal({
		title: 'Edit Student Details :',
		html: '\n\t\t\t<form id="edit-form">\n\t\t\t\t<input type="text" class="swal2-input" name="name"\n\t\t\t\t\tplaceholder="Name" value="' + name + '">\n\t\t\t\t<input type="text" class="swal2-input" name="rno"\n\t\t\t\t\tplaceholder="Roll No." value="' + rno + '">\n\t\t\t\t<input type="text" class="swal2-input" name="year"\n\t\t\t\t\tplaceholder="Passout Year" value="' + year + '">\n\t\t\t\t<input type="text" class="swal2-input" name="stream"\n\t\t\t\t\tplaceholder="Stream" value="' + stream + '">\n\t\t\t</form>',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Update!'
	}).then(function () {
		var data = {};
		var $input = $('#edit-form').serializeArray();
		$.each($input, function (index, $object) {
			data[$object.name] = $object.value;
		});
		if (checkEmpty(data)) return;
		if (data[rno] == rno) if (validate(data)) return;
		var index = students.findIndex(function (student) {
			return student.rno == rno;
		});
		students[index] = data;
		$tr.children('td:nth-child(2)').html(data.name);
		$tr.children('td:nth-child(3)').html(data.rno);
		$tr.children('td:nth-child(4)').html(data.year);
		$tr.children('td:nth-child(5)').html(data.stream);
		swal('Entry Updated!', 'One entry has been successfully updated', 'success');
	}).catch(swal.noop);
}

/* This function selects rows to delete by
 * adding table-danger class to the row.
 */
function selectRow($element) {
	var $tr = $element.parent().parent();
	$tr.toggleClass('table-danger');
	var $icon = $element.children();
	$icon.toggleClass('fa-check fa-times');
	toggleDelBtn();
}

/* This function calls deleteRow() to delete
 * multiple selected rows.
 */
function deleteSelected() {
	var $tr = $('tr.table-danger');
	swal({
		title: 'Are you sure?',
		text: 'You are about to delete ' + $tr.length + ' entries!',
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Confirm!'
	}).then(function () {
		$tr.each(function (index) {
			deleteRow($(this).children().children('a:first-child'));
		});
		toggleDelBtn();
		serialize();
		swal('Deleted!', $tr.length + ' entries deleted!', 'success');
	}).catch(swal.noop);
}

/* This function toggles the hidden attribute
 * of delete button.
 */
function toggleDelBtn() {
	if ($('tr.table-danger').length) {
		$('#delbtn').removeAttr('disabled');
	} else {
		$('#delbtn').attr('disabled', 'true');
	}
}

/* This function checks for empty fields and
 * displays an alert if found.
 * Use of ES6 for...of loop.
 */
function checkEmpty(data) {
	var pairs = Object.entries(data);
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = pairs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var pair = _step2.value;

			if (pair[1] == '') {
				swal('Empty fields found!', 'There must be no empty fields.', 'error');
				return true;
			}
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return false;
}

/* This function checks if data entry is unique and valid
 * and displays alert if it isn't.
 */
function validate(data) {
	var regex = /^[a-zA-Z .]{2,20}$/;
	if (!data.name.match(regex) || !data.stream.match(regex)) {
		swal('Unable to add!', 'Invalid Name and/or Stream.', 'error');
		return true;
	} else if (isNaN(data.rno) || isNaN(data.year) || parseInt(data.year) > 2030 || parseInt(data.year) < 1990) {
		swal('Unable to add!', 'Invalid Roll No. and/or Year.', 'error');
		return true;
	} else if (students.find(function (student) {
		return student.rno == data.rno;
	})) {
		swal('Unable to add!', 'Roll No. already exists.', 'error');
		return true;
	}
	return false;
}

/* This function serializes the table
 * entries.
 */
function serialize() {
	var $tr = $('tbody tr');
	$tr.each(function (index) {
		$(this).children('td:first-child').html(index + 1);
	});
}