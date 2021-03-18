// const basicLightbox = require('basiclightbox')
// import * as basicLightbox from 'basiclightbox'

import './styles.css';
import PhotoApi from './apiService';
import imageTpl from './template/imageCard.hbs';
import LoadMoreBtn from './loadeMoreBtn';
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const PhotoApiSertch = new PhotoApi();
const refs = {
  searchForm: document.querySelector('.js-search-form'),
  galleryListRef: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLodeMore);

function onSearch(e) {
  e.preventDefault();
  PhotoApiSertch.query = e.currentTarget.elements.query.value;
  loadMoreBtn.show();

  PhotoApiSertch.resetPage();
  refs.galleryListRef.innerHTML = '';

  onLodeMore();
}

function onLodeMore() {
  loadMoreBtn.disable();
  PhotoApiSertch.fetchPhoto().then(appendMarcup);
  loadMoreBtn.enable();
}
function appendMarcup(hits) {
  refs.galleryListRef.insertAdjacentHTML('beforeend', imageTpl(hits));
}
