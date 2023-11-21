// Function to fetch HTML content from the URL using CORS
export async function fetchHTML(url) {
	const corsAnywhereURL = 'https://corsproxy.io/?';
	const targetURL = corsAnywhereURL + url;
	try {
		const response = await fetch(targetURL);
		return await response.text();
	} catch (error) {
		console.error('Error fetching HTML:', error);
		return null;
	}
}

// Function to extract reviews from HTML block and return as JSON
export async function extractSuperProwoJazdyReviews(html) {
	const reviews = [];

	// Use DOMParser to parse only the relevant parts of the HTML
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');

	// Use the same extraction logic as before
	const container = doc.querySelector('#opinionlist');

	// Select all review items within the container
	const reviewItems = container.querySelectorAll('.company-details-comments-item');

	// Iterate through each review item
	reviewItems.forEach((item) => {
		const review = {};

		// Extract review details
		const authorElement = item.querySelector('.company-details-comments-item-header-person strong');
		review.author = authorElement ? authorElement.textContent.trim().replace(/(\s*ip:.*$)/i, '') : '';

		const dateElement = item.querySelector('[itemprop="datePublished"]');
		review.date = dateElement ? dateElement.getAttribute('content') : '';

		const descriptionElement = item.querySelector('[itemprop="description"]');
		review.description = descriptionElement ? descriptionElement.textContent.trim() : '';

		const ratingElement = item.querySelector('[itemprop="reviewRating"] [itemprop="ratingValue"]');
		review.rating = ratingElement ? parseFloat(ratingElement.getAttribute('content')) : 0;

		const categoryElement = item.querySelector('.company-details-comments-item-info p strong');
		review.category = categoryElement ? categoryElement.textContent.trim() : '';

		const trainingTypeElement = item.querySelector('.company-details-comments-item-info:nth-child(3) p strong');
		review.trainingType = trainingTypeElement ? trainingTypeElement.textContent.trim() : '';

		// Extract pros and cons
		const prosElement = item.querySelector('.company-details-comments-item-scores.green-score');
		review.pros = prosElement
			? Array.from(prosElement.querySelectorAll('span')).map((span) => span.textContent.replace(',', '').trim())
			: [];

		const consElement = item.querySelector('.company-details-comments-item-scores.red-score');
		review.cons = consElement
			? Array.from(consElement.querySelectorAll('span')).map((span) => span.textContent.replace(',', '').trim())
			: [];

		// Add the review to the array
		reviews.push(review);
	});

	// Return the reviews as JSON
	return orderReviewsByDateDescending(reviews);
}

// Function to order reviews by date in descending order
function orderReviewsByDateDescending(reviews) {
	return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to fetch data from superprawojazdy and extract reviews
export async function fetchSuperPrawoJazdyReviews(url) {
	const html = await fetchHTML(url);
	return await extractSuperProwoJazdyReviews(html);
}
