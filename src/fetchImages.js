import axios from 'axios';

export default async function fetchImages(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '4373432-e6a6d7ffe7a1bf4b9625eb026';
  const PARAMS = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  const URL = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}${PARAMS}`;

  const response = await axios.get(URL);
  return response.data;
}
