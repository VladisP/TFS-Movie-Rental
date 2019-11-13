import { mirror } from '../helpers/mirror.js';
import { getImageByRating } from '../helpers/getImageByRating.js';

const movieTemplate = document.createElement('template');

const movieCardStyles = `
  .result-list__poster-item {
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    background-color: rgba(255, 255, 255, 0.24);
    height: 100%;
    width: 100%;
  }

  .result-list__poster-item__link {
    display: block;
    height: 100%;
    width: 100%;
  }

  .result-list__poster-item__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .result-list__poster-item__decore-background {
    display: none;
  }

  .result-list__poster-item__description-wrapper {
    position: absolute;
    overflow: hidden;
    max-height: 40%;
    left: 20px;
    right: 20px;
    bottom: 20px;
    display: none;
  }

  .result-list__poster-item:hover {
    cursor: pointer;
  }
  
  .result-list__poster-item:hover .result-list__poster-item__decore-background {
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
  
  .result-list__poster-item:hover .result-list__poster-item__description-wrapper {
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
  
  .result-list__poster-item__rating-wrapper {
    grid-area: rating;
    overflow: hidden;
    display: flex;
  }
  
  .result-list__poster-item__rating {
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    margin-left: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    color: white;
  }
  
  .result-list__poster-item__title {
    grid-area: title;
    display: flex;
    align-items: center;
    overflow: hidden;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    color: white;
  }
  
  .result-list__poster-item__genre {
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
  
  .result-list__poster-item__year {
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
    <div class="result-list__poster-item">
        <a href="" class="result-list__poster-item__link">
            <img class="result-list__poster-item__image" src="/src/images/placeholder.png" />
            <div class="result-list__poster-item__decore-background"></div>
            <div class="result-list__poster-item__description-wrapper">
                <div class="result-list__poster-item__rating-wrapper">
                    <img class="result-list__poster-item__rating-image" src="" />
                    <div class="result-list__poster-item__rating"></div>
                </div>
                <div class="result-list__poster-item__title"></div>
                <div class="result-list__poster-item__genre"></div>
                <div class="result-list__poster-item__year"></div>
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

class MovieCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const template = movieTemplate.content.cloneNode(true);

    shadow.appendChild(template);
    mirror(params, this);
  }

  static get observedAttributes() {
    return params;
  }

  attributeChangedCallback(param, oldValue, newValue) {
    switch (param) {
      case 'title':
        return (this.shadowRoot.querySelector(
          '.result-list__poster-item__title'
        ).textContent = newValue);

      case 'poster':
        return (this.shadowRoot.querySelector(
          '.result-list__poster-item__image'
        ).src = newValue);

      case 'link':
        return (this.shadowRoot.querySelector(
          '.result-list__poster-item__link'
        ).href = newValue);

      case 'year':
        return (this.shadowRoot.querySelector(
          '.result-list__poster-item__year'
        ).textContent = newValue);

      case 'rating':
        this.shadowRoot.querySelector(
          '.result-list__poster-item__rating-image'
        ).src = getImageByRating(Number.parseFloat(newValue));

        return (this.shadowRoot.querySelector(
          '.result-list__poster-item__rating'
        ).textContent = newValue);

      case 'genre':
        return (this.shadowRoot.querySelector(
          '.result-list__poster-item__genre'
        ).textContent = newValue);
    }
  }
}

customElements.define('movie-card', MovieCard);
