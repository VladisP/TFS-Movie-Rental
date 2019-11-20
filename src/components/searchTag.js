import { mirror } from '../helpers/mirror.js';
import { makeAttributeChangingMap } from '../helpers/makeAttributeChangingMap.js';

const searchTagClasses = {
  searchTag: 'search-tag',
};

const searchTagTemplate = document.createElement('template');

const searchTagStyles = `
  .${searchTagClasses.searchTag} {
    display: flex;
    align-items: center;
    margin: 4px;
    padding: 6px 16px;
    height: 36px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
  }

  .${searchTagClasses.searchTag}:hover {
    background-color: white;
    cursor: pointer;
  }
`;

const searchTagHtml = `
    <div class="${searchTagClasses.searchTag}"></div>
`;

searchTagTemplate.innerHTML = `
  <style>
    ${searchTagStyles}
  </style>

  ${searchTagHtml}
`;

const params = ['movie'];

const attrChangedCallbacks = {
  movie(value) {
    this.shadowRoot.querySelector(
      `.${searchTagClasses.searchTag}`
    ).textContent = value;
  },
};

class SearchTag extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const template = searchTagTemplate.content.cloneNode(true);

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

customElements.define('search-tag', SearchTag);
