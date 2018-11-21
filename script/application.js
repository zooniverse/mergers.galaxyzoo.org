function fade_flashes() {
	$$('div.flash').each(function(element){
		Effect.Fade(element, { duration: 3.0 })
	});
}

function add_section(dragged, dropped, event){
	new Ajax.Request("/admin/pages/add_section/" , { method:'GET', asynchronous:true, evalScripts:true, onComplete:answers })
}

function loading(ident) {
	$(ident).style.display = 'none';
	$(ident + "_loading").style.display = '';
}

function loaded(ident) {
	$(ident + "_loading").style.display = 'none';
	$(ident).style.display = '';
}

function get_answer_count(){
	count = parseInt($('count').value);	
	return count;
}

function increment_counter(ident) {
	count = parseInt($(ident).value);
	count = count + 1;
	$(ident).value = count;
	return count;
}

function decrement_counter(ident) {
	count = parseInt($(ident).value);
	count = count - 1;
	$(ident).value = count;
	return count;
}

function add_answer() {
	count = get_answer_count() + 1;
	increment_counter('count');
	new Ajax.Request("/admin/tasks/add_answer/" + count, { method:'GET', asynchronous:true, evalScripts:true, onComplete:answers })
}

function remove_answer(ident) {
	if ($('count').value == 1) {
		return false;
	}
	
	$('answer_' + ident).style.display = 'none';
	decrement_counter('count');
	removeElement("answer_" + ident);
}

function removeElement(id) {
	var row = $(id);
	row.parentNode.removeChild(row);
}

function answers(response) {
	values = collect_values();
	if (response.status == 200) {
		$('answers').innerHTML = $('answers').innerHTML + response.responseText;		
		populate_values(values);
	} else {
		alert('problem!');
	}
}

function collect_values() {
	var field_values = new Array();
	if ($('task_form') != null) {
		for(i=0; i < $('task_form').elements.length; i++) {
			field = $('task_form').elements[i];
			if (field.type=="checkbox") {
				field_values[field.name] = field.checked;
			} else {
				field_values[field.name] = field.value;			
			}
		}	
	}
	return field_values;
}

function populate_values(values) {
	for(i=0; i < $('task_form').elements.length; i++) {
		field = $('task_form').elements[i];
		if (values[field.name] != null) {
			if (field.type=="checkbox") {
				field.checked = values[field.name];
			} else {
				field.value = values[field.name];
			}
		}
	}	
}

function NewWindow(mypage, myname, w, h, scroll) {
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable=0'
	win = window.open(mypage, myname, winprops)
	if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}