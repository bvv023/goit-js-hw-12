import axios from 'axios';

export async function getImage(query, page = 1) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '43225826-209ae09ba096a17ea4e8a3ec3';

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        lang: 'en',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });

    if (!response.data.hits.length) {
      throw new Error('No images found for the specified query.');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch images. Please try again.');
  }
}
