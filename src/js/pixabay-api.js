import axios from 'axios';

const API_KEY = '43225826-209ae09ba096a17ea4e8a3ec3';
const baseURL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page) {
  const response = await axios(baseURL, {
    params: {
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 15,
    },
  });
  return response.data;
}