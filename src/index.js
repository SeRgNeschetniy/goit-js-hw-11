import './css/styles.css';
import { pixbayAPI } from './fetchImages';
import { createGalleryCards } from './cardTpl';
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
  Notiflix.Notify.success(`Hooray! We found ${data?.totalHits} images.`);
};

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  captions: true,
});

const imageSearch = new pixbayAPI();

function onSearchForm(e) {
  e.preventDefault();

  if (e.type === 'submit') {
    imageSearch.reset();
  }

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

        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
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

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function loadMoreDisable() {
  refs.loadMoreBtn.classList.add('hidden');
}

function loadMoreEnable() {
  refs.loadMoreBtn.classList.remove('hidden');
}
