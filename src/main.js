import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImage } from './js/pixabay-api';
import { renderImages, appendImages } from './js/render-functions';

const searchForm = document.querySelector('.form');
const galleryImages = document.querySelector('.gallery');
const loadMove = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
loadMove.style.display = 'none';

let currentPage = 1; 
let currentQuery = '';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchForm.querySelector('[name="search"]').value.trim();

  if (query) {
    loadMove.style.display = 'flex';

    try {
      const data = await getImage(query, 1);

      if (!data.hits.length) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please, try again!',
          close: true,
        });
      }

      currentQuery = query;
      currentPage = 1;

      renderImages(data.hits);

      if (data.totalHits > currentPage * 15) {
        loadMoreBtn.style.display = 'block'; 
      } else {
        loadMoreBtn.style.display = 'none'; 
      }
    } catch (error) {
      console.error(error.message);
      iziToast.error({
        message: 'Failed to fetch images. Please try again.',
        close: true,
      });
    } finally {
      loadMove.style.display = 'none'; 
    }
  }

  event.target.reset(); 
});

loadMoreBtn.addEventListener('click', async () => {
  loadMove.style.display = 'flex'; 

  try {
    const data = await getImage(currentQuery, ++currentPage); 

    if (!data.hits.length) {
      iziToast.info({
        message: 'You have reached the end of search results.',
        close: true,
      });
      loadMoreBtn.style.display = 'none';
      return;
    }

    appendImages(data.hits); 

    const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error(error.message);
    iziToast.error({
      message: 'Failed to fetch images. Please try again.',
      close: true,
    });
  } finally {
    loadMove.style.display = 'none'; 
  }
});

export { searchForm, galleryImages, loadMove, loadMoreBtn, currentPage, currentQuery };
