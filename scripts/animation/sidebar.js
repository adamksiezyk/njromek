function toggleSidebar() {
	let sidebar = document.getElementById("sidebar");
	let burgerIcon = document.getElementById("burger-icon");

	if (burgerIcon.classList.contains("close")) {
		sidebar.classList.remove("close");
		burgerIcon.innerHTML = "&#9776;";
		burgerIcon.classList.remove("close");
	} else {
		sidebar.classList.add("close");
		burgerIcon.innerHTML = "&times;";
		burgerIcon.classList.add("close");
	}
}

// Add event listener to close sidebar when clicked outside
document.addEventListener("click", function(event) {
	let sidebar = document.getElementById("sidebar");
	let burgerIcon = document.getElementById("burger-icon");
	let targetElement = event.target; // Clicked element

	// Check if the clicked element is not within the sidebar
	if (!sidebar.contains(targetElement) && !burgerIcon.contains(targetElement)) {
		if (burgerIcon.classList.contains("close")) {
			sidebar.classList.remove("close");
			burgerIcon.innerHTML = "&#9776;";
			burgerIcon.classList.remove("close");
		}
	}
});
