// модуль 2 'render-functions.js'

import SimpleLightbox from 'simplelightbox';

export const galleryElement = document.querySelector('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

lightbox.refresh();

export function renderPic(data) {
  galleryElement.insertAdjacentHTML('beforeend', generateMarkup(data));
  lightbox.refresh();
}
function generateMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="card">
        <a href="${largeImageURL}" class="link">
          <img src="${webformatURL}" alt="${tags}">
          <ul class="list-container">
          <li class="item-description"><h3>Likes</h3> <p>${likes}</p></li>
          <li class="item-description"><h3>Views</h3> <p>${views}</p></li>
          <li class="item-description"><h3>Comments</h3> <p>${comments}</p></li>
          <li class="item-description"><h3>Downloads</h3> <p>${downloads}</p></li>
        </ul>
        </a>
      
      </li>`
    )
    .join(' ');
}
export function showEndMessage() {
  const endMessage = document.createElement('p');
  endMessage.classList.add('end-message');
  endMessage.textContent =
    "We're sorry, but you've reached the end of search results.";
  galleryElement.insertAdjacentElement('afterend', endMessage);
}
