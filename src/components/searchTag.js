import { mirror } from '../helpers/mirror.js';

const searchTagTemplate = document.createElement('template');

const searchTagStyles = `
  .search-history-block__elem {
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

  .search-history-block__elem:hover {
    background-color: white;
    cursor: pointer;
  }
`;

const searchTagHtml = `
    <div class="search-history-block__elem"></div>
`;

searchTagTemplate.innerHTML = `
  <style>
    ${searchTagStyles}
  </style>

  ${searchTagHtml}
`;

const params = ['movie'];

class SearchTag extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const template = searchTagTemplate.content.cloneNode(true);

    shadow.appendChild(template);
    mirror(params, this);
  }

  static get observedAttributes() {
    return params;
  }

  attributeChangedCallback(param, oldValue, newValue) {
    switch (param) {
      case 'movie':
        return (this.shadowRoot.querySelector(
          '.search-history-block__elem'
        ).textContent = newValue);
    }
  }
}

customElements.define('search-tag', SearchTag);
