import './css/styles.css';
import fetchImages from './fetchImages';
import { pixbayAPI } from './fetchImages';
import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

loadMoreDisable();

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onSearchForm);

const updateUi = data => {
  clearGallery();
  Notiflix.Notify.info(`Hooray! We found ${data?.totalHits} images.`);
};

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  captions: true,
});

const imageSearch = new pixbayAPI();

function onSearchForm(e) {
  e.preventDefault();

  imageSearch.searchQuery = refs.searchForm.searchQuery.value.trim();

  imageSearch
    .getImages()
    .then(data => {
      if (e.type === 'submit') {
        updateUi(data);
      }

      renderImages(data.hits);

      lightbox.refresh();

      imageSearch.incrementPage();
      if (imageSearch.page > Math.ceil(data?.totalHits / 40)) {
        loadMoreDisable();
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        loadMoreEnable();
      }
    })
    .catch(error => {
      clearGallery();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    })
    .finally(() => {});
}

const renderImages = data => {
  refs.gallery.innerHTML += createGalleryCards(data);
};

const createGalleryCards = data => {
  return data
    ?.map(
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
    )
    .join('');
};

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function loadMoreDisable() {
  refs.loadMoreBtn.setAttribute('hidden', true);
}

function loadMoreEnable() {
  refs.loadMoreBtn.removeAttribute('hidden');
}
