import axios from 'axios';

export default async function fetchImages(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '4373432-e6a6d7ffe7a1bf4b9625eb026';
  const PARAMS = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  const URL = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}${PARAMS}`;

  const response = await axios.get(URL);
  return response.data;
}

export class pixbayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '4373432-e6a6d7ffe7a1bf4b9625eb026';
  #searchQuery;
  #page;

  constructor() {
    this.#page = 1;
    this.#searchQuery = '';
  }

  #searchParams = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  });

  set searchQuery(guery) {
    this.#searchQuery = guery;
  }

  get searchQuery() {
    this.#searchQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  get page() {
    return this.#page;
  }

  async getImages() {
    const url = `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
      this.#searchQuery
    }&page=${this.#page}&${this.#searchParams}`;
    const data = await axios.get(url);
    return data.data;
  }
}
