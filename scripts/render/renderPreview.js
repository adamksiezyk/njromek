export function renderPreview(preview, url) {
	const previewCard = document.createElement('div');
	previewCard.classList.add('review-card');

	// Create elements to display the preview
	if (preview.imageUrl) {
		const imageElement = document.createElement('img');
		imageElement.classList.add('preview-image');
		imageElement.src = preview.imageUrl;
		imageElement.alt = 'Preview Image';
		previewCard.appendChild(imageElement);
	}

	const titleElement = document.createElement('p');
	titleElement.classList.add('preview-title');
	titleElement.innerText = preview.title;
	previewCard.appendChild(titleElement);

	const descriptionElement = document.createElement('p');
	descriptionElement.classList.add('preview-description');
	descriptionElement.innerText = preview.description;
	previewCard.appendChild(descriptionElement);

	const loadMore = document.createElement('a');
	loadMore.classList.add('preview');
	loadMore.href = url;
	loadMore.target = '_blank';
	loadMore.appendChild(previewCard);
	return loadMore;
}