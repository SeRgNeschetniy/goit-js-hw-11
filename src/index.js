import './css/styles.css';
import fetchImages from './fetchImages';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let page = 1;

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onSearchForm);

function onSearchForm(e) {
  e.preventDefault();
  const searchQuery = refs.searchForm.searchQuery.value.trim();

  fetchImages(searchQuery, page)
    .then(data => {
      clearGallery();
      console.log(data.hits);
      renderImages(data.hits);

      var lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        captions: true,
      });
    })
    .catch(error => {
      clearGallery();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    })
    .finally(() => {
      page += 1;
    });
}

const renderImages = data => {
  clearGallery();
  refs.gallery.innerHTML = createGallery(data);
};

const createGallery = data => {
  return data.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) =>
      `<a class="photo-card" href="${largeImageURL}">
        <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="photo-card__info">
            <p class="info-item">
              <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
              <b>Views: ${views}</b>
            </p>
            <p class="info-item">
              <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads: ${downloads}</b>
            </p>
          </div>
        </a>`
  );
};

function clearGallery() {
  refs.gallery.innerHTML = '';
}
