// Smooth scroll to section with consideration for navbar height
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function(e) {
		e.preventDefault();

		const navbarHeight = 120; // Adjust this value according to your navbar height
		const targetId = this.getAttribute("href").substring(1);
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			const topOffset = targetElement.offsetTop - navbarHeight;

			window.scrollTo({
				top: topOffset,
				behavior: "smooth",
			});
		}
	});
});
