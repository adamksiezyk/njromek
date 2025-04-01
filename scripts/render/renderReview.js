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

	// Convert the rating from 1-10 scale to 0-5 stars
	const fullStars = Math.floor(review.rating / 2);
	const hasHalfStar = review.rating % 2 == 1;

	// Generate star rating HTML
	let starsHTML = "";
	// Add full stars
	for (let i = 0; i < fullStars; i++) {
		starsHTML += '<i class="fas fa-star text-yellow-400"></i>';
	}
	// Add half star if needed
	if (hasHalfStar) {
		starsHTML += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
	}
	// Add empty stars
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
	for (let i = 0; i < emptyStars; i++) {
		starsHTML += '<i class="far fa-star text-yellow-400"></i>';
	}

	// Determine avatar source
	const avatarSrc = review.image
		? review.image
		: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23CBD5E0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>';

	// Author, Date, Rating, and Description
	reviewCard.innerHTML = `
	<div class="flex items-center justify-center">
	    <div class="avatar mr-3 flex-shrink-0">
	      <img 
	        src='${avatarSrc}' 
	        alt="User Avatar" 
	        class="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
	      >
	    </div>
	    <div class="author font-semibold">${review.author}</div>
	  </div>
	  <div class="date mb-3 text-sm text-gray-500 dark:text-gray-400">${review.date}</div>
	  <div class="rating mb-3">${starsHTML} <span class="ml-1 text-sm text-gray-500 dark:text-gray-400">(${review.rating}/10)</span></div>
	  <div class="description mb-4">${review.description}</div>
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
