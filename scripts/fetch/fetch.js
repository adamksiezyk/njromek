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

// Function to fetch webpage preview, returns JSON containing: title, description and imageUrl
export async function fetchPreview(url) {
	// Read the response as text
	const html = await fetchHTML(url);

	// Create a temporary element to parse the HTML
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');

	// Get the title and meta tags from the parsed HTML
	const title = doc.querySelector('title').innerText;
	const metaDescription = doc.querySelector('meta[name="description"]');
	const description = metaDescription ? metaDescription.content : '';
	const ogImage = doc.querySelector('meta[property="og:image"]');
	const imageUrl = ogImage ? ogImage.content : '';

	return { title, description, imageUrl };
}
