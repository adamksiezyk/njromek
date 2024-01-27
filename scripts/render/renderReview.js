// Function to render reviews
export function renderSuperPrawoJazdyReview(review) {
	const reviewCard = document.createElement("div");
	reviewCard.classList.add(
		"review-card",
		"text-gray-900",
		"bg-white",
		"rounded-lg",
		"border",
		"border-gray-100",
		"shadow",
		"dark:border-gray-600",
		"w-[350px]",
		"lg:w-[768px]",
		"p-5",
		"dark:bg-gray-800",
		"dark:text-white",
	);

	// Author, Date, Rating, and Description
	reviewCard.innerHTML = `
	  <div class="author">${review.author}</div>
	  <div class="date">${review.date}</div>
	  <div class="rating">&#9733; ${review.rating}</div>
	  <div class="description">${review.description}</div>
	`;

	// Pros and Cons
	if (review.pros.length > 0 || review.cons.length > 0) {
		const prosConsElement = document.createElement("div");
		prosConsElement.classList.add("pros-cons");

		// Pros
		if (review.pros.length > 0) {
			const prosElement = document.createElement("div");
			prosElement.classList.add("pros");
			prosElement.innerHTML = `<i class="fas fa-thumbs-up"></i> ${review.pros.join(", ")}`;
			prosConsElement.appendChild(prosElement);
		}

		// Cons
		if (review.cons.length > 0) {
			const consElement = document.createElement("div");
			consElement.classList.add("cons");
			consElement.innerHTML = `<i class="fas fa-thumbs-down"></i> ${review.cons.join(", ")}`;
			prosConsElement.appendChild(consElement);
		}

		reviewCard.appendChild(prosConsElement);
	}

	return reviewCard;
}
