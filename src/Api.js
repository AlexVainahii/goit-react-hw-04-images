import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export class PixabayApi {
  #params = {
    params: {
      key: '30581887-eee3cf06f7a40c5ac298de631',
      q: 'car',
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: true,
      page: 1,
      per_page: 12,
    },
  };
  constructor() {
    this.maxP = 0;
  }

  async getPhotos() {
    const data = await axios.get('', this.#params);
    return data;
  }
  get search() {
    return this.#params.params.q;
  }
  set search(q) {
    this.#params.params.q = q;
    this.#params.params.page = 1;
  }
  get maxPages() {
    return this.maxP;
  }
  set maxPages(max) {
    this.maxP = max;
  }

  incPage() {
    return (this.#params.params.page += 1);
  }
  resetPage() {
    this.#params.params.page = 1;
  }
  ShowLoadMore() {
    return this.#params.params.page < this.maxP;
  }
}
