import { clearContainer } from '../helpers/clearContainer.js';
import { getDeclension } from '../helpers/getDeclension.js';
import { manageSearchState } from '../helpers/viewStateManager.js';
import { loadMessages } from '../helpers/loadStateManager.js';

const dMovies = getDeclension('фильм', 'фильма', 'фильмов');

export const createView = () => {
  const searchForm = document.querySelector(`.search-wrapper-default`);
  const searchInput = searchForm.querySelector('.search-block__input-string');
  const searchTags = searchForm.querySelector('.search-history-block');

  const loader = document.querySelector('.loader-invisible');

  const resultsList = document.querySelector('.result-list');
  const resultsHeader = document.querySelector('.result-header');

  manageSearchState(searchForm, searchInput);

  const renderList = (results) => {
    const list = document.createDocumentFragment();

    results.forEach((movieData) => {
      const movie = document.createElement('movie-card');

      if (movieData.poster !== 'N/A') {
        movie.poster = movieData.poster;
      }

      movie.title = movieData.title;
      movie.year = movieData.year;
      movie.link = movieData.link;

      list.appendChild(movie);
    });

    clearContainer(resultsList);
    resultsList.appendChild(list);
  };

  const renderSearchHistoryList = (terms) => {
    const list = document.createDocumentFragment();

    terms.forEach((movie) => {
      const searchTag = document.createElement('search-tag');

      searchTag.movie = movie;

      list.appendChild(searchTag);
    });

    clearContainer(searchTags);
    searchTags.appendChild(list);
  };

  const renderCount = (count) => {
    resultsHeader.textContent = `Нашли ${count} ${dMovies(count)}`;
  };

  const renderError = (error) => {
    resultsHeader.textContent = error;
  };

  const renderLoader = (message) => {
    switch (message) {
      case loadMessages.start:
        loader.className = 'loader-visible';
        break;
      case loadMessages.end:
        loader.className = 'loader-invisible';
        break;
    }
  };
  renderLoader.isLoadListener = true;

  const onSearchSubmit = (_listener) => {
    const listener = (event) => {
      event.preventDefault();
      _listener(searchInput.value);
      searchInput.value = '';
    };

    searchForm.addEventListener('submit', listener);
  };

  const onTagClick = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.shadowRoot && !event.altKey) {
        _listener(event.target.movie);
      }
    };

    searchTags.addEventListener('click', listener);
  };

  const onTagRemove = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.shadowRoot && event.altKey) {
        _listener(event.target.movie);
      }
    };

    searchTags.addEventListener('click', listener);
  };

  return {
    renderList,
    renderSearchHistoryList,
    renderCount,
    renderError,
    renderLoader,
    onSearchSubmit,
    onTagClick,
    onTagRemove,
  };
};
