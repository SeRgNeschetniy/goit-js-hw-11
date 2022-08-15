export const createGalleryCards = data => {
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
