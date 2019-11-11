import { clearContainer } from '../helpers/clearContainer.js';
import { getDeclension } from '../helpers/getDeclension.js';
import { manageSearchState } from '../helpers/viewStateManager.js';

const dMovies = getDeclension('фильм', 'фильма', 'фильмов');

export const createView = () => {
  const searchForm = document.querySelector(`.search-wrapper-default`);
  const searchInput = searchForm.querySelector('.search-block__input-string');

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

  const renderCount = (count) => {
    resultsHeader.textContent = `Нашли ${count} ${dMovies(count)}`;
  };

  const renderError = (error) => {
    resultsHeader.textContent = error;
  };

  const onSearchSubmit = (_listener) => {
    const listener = (event) => {
      event.preventDefault();
      _listener(searchInput.value);
      searchInput.value = '';
    };

    searchForm.addEventListener('submit', listener);
  };

  return {
    renderList,
    renderCount,
    renderError,
    onSearchSubmit,
  };
};
