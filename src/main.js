// модуль 3 'main.js'
// модуль 3 'main.js'
import { fetchImages } from './js/pixabay-api';
import './css/loader.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderPic, galleryElement, showEndMessage } from './js/render-functions'; // Замінено на 'import * as renderFunctions from './js/render-functions';'
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');
const inputElement = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

loader.style.display = 'none';

let searchTerm = '';
let pageCounter = 1;
const perPage = 15;

searchForm.addEventListener('submit', submitHandle);

async function submitHandle(event) {
  event.preventDefault();

  searchTerm = inputElement.value.trim();
  pageCounter = 1;

  galleryElement.innerHTML = '';

  if (searchTerm === '') {
    iziToast.error({
      message: 'The field can not be empty!',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      messageSize: '16px',
      messageLineHeight: '100%',
      iconColor: 'white',
      title: 'Attention',
    });
    hideLoadMoreBtn();
    return;
  }

  hideEndMessage();

  showLoader();

  try {
    const images = await fetchImages(searchTerm, pageCounter, perPage);
    const totalHits = images.totalHits;

    if (images.hits.length === 0) {
      galleryElement.innerHTML = '';
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        messageSize: '16px',
        messageLineHeight: '100%',
        iconColor: 'white',
        title: 'Info',
      });
      hideLoadMoreBtn();
      return;
    } else {
      renderPic(images.hits);
      inputElement.value = '';
      showLoadMoreBtn();
    }

    if (perPage * pageCounter >= totalHits) {
      hideLoadMoreBtn();
      showEndMessage();
    }
  } catch (error) {
    console.error('Error:', error);
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      messageSize: '16px',
      messageLineHeight: '100%',
      iconColor: 'white',
      title: 'Error',
    });
  } finally {
    hideLoader();
  }
}

loadMoreBtn.addEventListener('click', async () => {
  try {
    pageCounter += 1;

    const images = await fetchImages(searchTerm, pageCounter, perPage);
    const totalHits = images.totalHits;

    renderPic(images.hits);
    showLoader();

    if (perPage * pageCounter >= totalHits) {
      hideLoadMoreBtn();
      showEndMessage();
    }

    smoothScrollToNextGroup();
  } catch (error) {
    console.error('Error fetching more images:', error);
    iziToast.error({
      title: 'Error',
      message: `Error fetching more images: ${error}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function smoothScrollToNextGroup() {
  const firstGalleryItem = document.querySelector('.gallery a');
  if (firstGalleryItem) {
    const galleryItemHeight = firstGalleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: galleryItemHeight * 2,
      behavior: 'smooth',
    });
  }
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function hideEndMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) {
    endMessage.remove();
  }
}
