import './sass/main.scss';
import PixabayApiServices from "./js/pixabay-services";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';


const pixabayApiServices = new PixabayApiServices;

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

refs.form.addEventListener("submit", onSearchImg);
refs.loadMoreBtn.addEventListener("click", onLoadMoreImg);

hideLoadMoreBtn();


async function onSearchImg(event){
    event.preventDefault();

    const searchQuery = event.currentTarget.elements.searchQuery;
    pixabayApiServices.searchQuery = searchQuery.value.trim();
    if (!pixabayApiServices.searchQuery) {
      Notify.failure("Please, input search query!")
        return;
    } 
    
    
    try {
      refs.form.reset();
      clearGalerry();
      pixabayApiServices.resetPage();
      hideLoadMoreBtn();
      
      const galleryImages = await pixabayApiServices.getImages(pixabayApiServices.searchQuery);
      if(!galleryImages.hits.length){
        
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return;
      }
      Notify.success(`Hooray! We found ${galleryImages.totalHits} images.`);
      showLoadMoreBtn();
      console.log("🚀 ~ onSearchImg ~ galleryImages", galleryImages)
        
        const markup = await renderCardImg(galleryImages.hits);
        refs.gallery.innerHTML = markup;
        const lightbox = showGalleryLargeImage();
        lightbox.on();
        
        
    } catch (error) {
      // Notify.failure(error.text)
      console.log(error);
    }
    
}

function renderCardImg(elements){
return    elements.map(({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) => {

        return `<a class="gallery-link" href="${largeImageURL}">
        <div class="photo-card">
        <img class="photo-card_img"   src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${downloads}
          </p>
        </div>
      </div>
      </a>`
    }).join('');
}

let imagesPerPage = 40;  
async function onLoadMoreImg(){
  try {
    
    pixabayApiServices.incrementPage();
    const galleryImages = await pixabayApiServices.getImages(pixabayApiServices.searchQuery);
    imagesPerPage += 40;
    const markup = await renderCardImg(galleryImages.hits);
    refs.gallery.insertAdjacentHTML("beforeend", markup) ;
    const lightbox = showGalleryLargeImage();
    lightbox.refresh();
    if(galleryImages.totalHits <= imagesPerPage){
      hideLoadMoreBtn();
      Notify.info("We're sorry, but you've reached the end of search results.");
      
    }

  } catch (error) {
    // Notify.failure(error)
    console.log(error);
  }
}

function clearGalerry(){
refs.gallery.innerHTML = "";
}

function hideLoadMoreBtn(){
  refs.loadMoreBtn.classList.add("hidden");
}
function showLoadMoreBtn(){
  refs.loadMoreBtn.classList.remove("hidden");
}

function showGalleryLargeImage(){
  
  let simplelightbox = new SimpleLightbox('.gallery-link', {
    captionsData: "alt",
    captionDelay: 250,
  })
  return simplelightbox;
  

}


