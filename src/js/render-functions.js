export function clearGallery() {
  const galleryImages = document.querySelector('.gallery');
  galleryImages.innerHTML = '';
}

export function renderImages(data) {
  clearGallery();

  const galleryImages = document.querySelector('.gallery');
  const galleryMarkup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              src="${webformatURL}"
              data-source="${largeImageURL}"
              alt="${tags}"
            />
            <ul class="gallery-description">
              <li class="gallery-dscr_item"><h3>Likes</h3><p>${likes}</p></li>
              <li class="gallery-dscr_item"><h3>Views</h3><p>${views}</p></li>
              <li class="gallery-dscr_item"><h3>Comments</h3><p>${comments}</p></li>
              <li class="gallery-dscr_item"><h3>Downloads</h3><p>${downloads}</p></li>
            </ul>
          </a>
        </li>`;
      }
    )
    .join('');

  galleryImages.innerHTML = galleryMarkup;
}

export function appendImages(newImages) {
  const galleryImages = document.querySelector('.gallery');
  const galleryMarkup = newImages
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              src="${webformatURL}"
              data-source="${largeImageURL}"
              alt="${tags}"
            />
            <ul class="gallery-description">
              <li class="gallery-dscr_item"><h3>Likes</h3><p>${likes}</p></li>
              <li class="gallery-dscr_item"><h3>Views</h3><p>${views}</p></li>
              <li class="gallery-dscr_item"><h3>Comments</h3><p>${comments}</p></li>
              <li class="gallery-dscr_item"><h3>Downloads</h3><p>${downloads}</p></li>
            </ul>
          </a>
        </li>`;
      }
    )
    .join('');

  galleryImages.innerHTML += galleryMarkup;
}
