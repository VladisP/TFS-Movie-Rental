import { clearContainer } from '../helpers/clearContainer.js';
import { getDeclension } from '../helpers/getDeclension.js';
import { searchStates, resultStates } from '../helpers/containersStates.js';
import { changeContainerState } from '../helpers/changeContainerState.js';

const dMovies = getDeclension('фильм', 'фильма', 'фильмов');

export const createView = () => {
  const searchForm = document.querySelector(`.${searchStates.default}`);
  const searchInput = searchForm.querySelector('.search-block__input-string');

  const resultsWrapper = document.querySelector(`.${resultStates.none}`);
  const resultsList = document.querySelector('.result-list');
  const resultsHeader = document.querySelector('.result-header');

  searchInput.addEventListener('click', () => {
    if (!searchForm.classList.contains(searchStates.active)) {
      console.log('SEARCH: default -> active');
      changeContainerState(searchForm, searchStates.active);
    }
  });

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
      if (!resultsWrapper.classList.contains(resultStates.live)) {
        console.log('RESULT: none -> live');
        changeContainerState(resultsWrapper, resultStates.live);
      }
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
