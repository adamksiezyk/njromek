// Render the content within a swiper-slide wrapper
export function renderSwiperSlide(content) {
	const swiperSlide = document.createElement('div');
	swiperSlide.classList.add('swiper-slide');
	swiperSlide.appendChild(content);
	return swiperSlide;
}
