import { mirror } from '../helpers/mirror.js';
import { getImageByRating } from '../helpers/getImageByRating.js';
import { makeAttributeChangingMap } from '../helpers/makeAttributeChangingMap.js';

const movieCardClasses = {
  movie: 'movie',
  link: 'movie__link',
  image: 'movie__image',
  background: 'movie__decore-background',
  descriptionWrapper: 'movie__description-wrapper',
  ratingWrapper: 'movie__rating-wrapper',
  ratingImage: 'movie__rating-image',
  ratingValue: 'movie__rating',
  title: 'movie__title',
  genre: 'movie__genre',
  year: 'movie__year',
};

const movieTemplate = document.createElement('template');

const movieCardStyles = `
  .${movieCardClasses.movie} {
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    background-color: rgba(255, 255, 255, 0.24);
    height: 100%;
    width: 100%;
  }

  .${movieCardClasses.link} {
    display: block;
    height: 100%;
    width: 100%;
  }

  .${movieCardClasses.image} {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .${movieCardClasses.background} {
    display: none;
  }

  .${movieCardClasses.descriptionWrapper} {
    position: absolute;
    overflow: hidden;
    max-height: 40%;
    left: 20px;
    right: 20px;
    bottom: 20px;
    display: none;
  }

  .${movieCardClasses.movie}:hover {
    cursor: pointer;
  }
  
  .${movieCardClasses.movie}:hover .${movieCardClasses.background} {
    display: block;
    border-radius: 12px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 26.43%,
      rgba(0, 0, 0, 0.8) 72.41%
    );
    backdrop-filter: blur(2px);
  }
  
  .${movieCardClasses.movie}:hover .${movieCardClasses.descriptionWrapper} {
    display: grid;
    grid-template-columns: minmax(0px, 3fr) minmax(0px, 1fr);
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'rating rating'
      'title title'
      'genre year';
    row-gap: 4px;
    column-gap: 46px;
  }
  
  .${movieCardClasses.ratingWrapper} {
    grid-area: rating;
    overflow: hidden;
    display: flex;
  }
  
  .${movieCardClasses.ratingValue} {
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    margin-left: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    color: white;
  }
  
  .${movieCardClasses.title} {
    grid-area: title;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    color: white;
  }
  
  .${movieCardClasses.genre} {
    grid-area: genre;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 12px;
  }
  
  .${movieCardClasses.year} {
    grid-area: year;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    text-align: right;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 12px;
  }
`;

const movieCardHtml = `
    <div class="${movieCardClasses.movie}">
        <a href="" class="${movieCardClasses.link}">
            <img class="${movieCardClasses.image}" src="/src/images/placeholder.png" />
            <div class="${movieCardClasses.background}"></div>
            <div class="${movieCardClasses.descriptionWrapper}">
                <div class="${movieCardClasses.ratingWrapper}">
                    <img class="${movieCardClasses.ratingImage}" src="" />
                    <div class="${movieCardClasses.ratingValue}"></div>
                </div>
                <div class="${movieCardClasses.title}"></div>
                <div class="${movieCardClasses.genre}"></div>
                <div class="${movieCardClasses.year}"></div>
            </div>
        </a>
    </div>
`;

movieTemplate.innerHTML = `
  <style>
    ${movieCardStyles}
  </style>

  ${movieCardHtml}
`;

const params = ['title', 'poster', 'link', 'year', 'genre', 'rating'];

const attrChangedCallbacks = {
  title(value) {
    this.shadowRoot.querySelector(
      `.${movieCardClasses.title}`
    ).textContent = value;
  },
  poster(value) {
    this.shadowRoot.querySelector(`.${movieCardClasses.image}`).src = value;
  },
  link(value) {
    this.shadowRoot.querySelector(`.${movieCardClasses.link}`).href = value;
  },
  year(value) {
    this.shadowRoot.querySelector(
      `.${movieCardClasses.year}`
    ).textContent = value;
  },
  rating(value) {
    this.shadowRoot.querySelector(
      `.${movieCardClasses.ratingImage}`
    ).src = getImageByRating(Number.parseFloat(value));

    this.shadowRoot.querySelector(
      `.${movieCardClasses.ratingValue}`
    ).textContent = value;
  },
  genre(value) {
    this.shadowRoot.querySelector(
      `.${movieCardClasses.genre}`
    ).textContent = value;
  },
};

class MovieCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const template = movieTemplate.content.cloneNode(true);

    shadow.appendChild(template);
    mirror(params, this);

    this.attributeChangingMap = makeAttributeChangingMap(
      attrChangedCallbacks,
      this
    );
  }

  static get observedAttributes() {
    return params;
  }

  attributeChangedCallback(param, oldValue, newValue) {
    this.attributeChangingMap[param](newValue);
  }
}

customElements.define('movie-card', MovieCard);
