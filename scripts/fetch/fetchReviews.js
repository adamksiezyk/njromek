import { fetchHTML } from './fetch.js';

// Function to fetch data from superprawojazdy and extract reviews
export async function fetchSuperPrawoJazdyReviews(url) {
	const html = await fetchHTML(url);
	return await extractSuperProwoJazdyReviews(html);
}

// Function to extract reviews from HTML block and return as JSON
// Returns an ordered descending by date array of reviews JSONs
async function extractSuperProwoJazdyReviews(html) {
	const reviews = [];

	// Use DOMParser to parse only the relevant parts of the HTML
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');

	const container = doc.querySelector('#opinionlist');

	// Select all review items within the container
	const reviewItems = container.querySelectorAll('.company-details-comments-item');

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
		reviews.push(review);
	});

	return orderReviewsByDateDescending(reviews);
}

// Function to order reviews by date in descending order
function orderReviewsByDateDescending(reviews) {
	return reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
}
