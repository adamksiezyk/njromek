function toggleSidebar() {
	var sidebar = document.getElementById('sidebar');
	var burgerIcon = document.getElementById('burger-icon');

	if (burgerIcon.classList.contains('close')) {
		sidebar.classList.remove('close');
		burgerIcon.innerHTML = '&#9776;';
		burgerIcon.classList.remove('close');
	} else {
		sidebar.classList.add('close');
		burgerIcon.innerHTML = '&times;';
		burgerIcon.classList.add('close');
	}
}
