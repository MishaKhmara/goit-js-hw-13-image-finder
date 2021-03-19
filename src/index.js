import './styles.css';
import PhotoApi from './apiService';
import imageTpl from './template/imageCard.hbs';
import LoadMoreBtn from './loadeMoreBtn';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
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
  PhotoApiSertch.resetPage();
  refs.galleryListRef.innerHTML = '';
  loadMoreBtn.show();
  loadMoreBtn.disable();
  onLodeMore()
}

function onLodeMore(hits) {
  PhotoApiSertch.fetchPhoto()
    .then(appendMarcup)
    .then(data => {
      loadMoreBtn.enable();
      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });
    })
     
   
}
function appendMarcup(hits) {
  refs.galleryListRef.insertAdjacentHTML('beforeend', imageTpl(hits));
  if(hits.length < 12){
   return loadMoreBtn.hide()
  }
}

document.body.addEventListener('click', event => {
  if (event.target.nodeName !== 'IMG') return;

  const instance = basicLightbox.create(
    `<img class="img-lightbox" src="${event.target.dataset.source}" />`,
  );
  instance.show();
});
