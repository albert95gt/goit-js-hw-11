import './sass/main.scss';
import { getImages } from "./js/api-service";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
}

refs.form.addEventListener("submit", onSearchImg)

async function onSearchImg(event){
    event.preventDefault();

    const searchQuery = event.currentTarget.elements.searchQuery;
    const trimedSearchQuery = searchQuery.value.trim();
    if (!trimedSearchQuery) {
        return;
    }
    const galleryImages = await getImages(trimedSearchQuery);
    console.log("🚀 ~ onSearchImg ~ galleryImages", galleryImages)
    if(!galleryImages.length){
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    
    try {
        const markup = await renderCardImg(galleryImages);
        refs.gallery.innerHTML = markup;
    } catch (error) {
        alert('bad request!!!')
    }
    
}

function renderCardImg(elements){
return    elements.map(({ webformatURL, tags, likes, views, comments, downloads }) => {

        return `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
      </div>`
    }).join('');
}
