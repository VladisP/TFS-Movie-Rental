import { mapMovie } from './helpers/mapMovie.js';

//Components
import './components/movieCard.js';

const searchStates = {
  default: 'search-wrapper-default',
  active: 'search-wrapper-active',
  scroll: 'search-wrapper-scroll',
};

const resultStates = {
  none: 'result-wrapper-none',
  live: 'result-wrapper-live',
  notFound: 'result-wrapper-not-found',
};

const searchForm = document.querySelector(`.${searchStates.default}`);
const searchInput = searchForm.querySelector('.search-block__input-string');
const resultsWrapper = document.querySelector(`.${resultStates.none}`);
const resultsList = document.querySelector('.result-list');

const changeElementState = (element, state) => {
  element.className = '';
  element.classList.add(state);
};

const clearContainer = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const render = (movieData) => {
  const movie = document.createElement('movie-card');

  if (movieData.poster !== 'N/A') {
    movie.poster = movieData.poster;
  }

  movie.title = movieData.title;
  movie.year = movieData.year;
  movie.link = movieData.link;

  return movie;
};

const search = async (searchTerm) => {
  clearContainer(resultsList);

  const { Search } = await fetch(
    `http://www.omdbapi.com/?apikey=2fe365ef&type=movie&s=${searchTerm}`
  ).then((r) => r.json());

  const movies = Search.map((result) => render(mapMovie(result)));

  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => fragment.appendChild(movie));
  resultsList.appendChild(fragment);
};

const subscribeToSubmit = () => {
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!resultsWrapper.classList.contains(resultStates.live)) {
      console.log('RESULT: none -> live');
      changeElementState(resultsWrapper, resultStates.live);
    }
    search(searchInput.value);
  });
};

searchInput.addEventListener('click', () => {
  if (!searchForm.classList.contains(searchStates.active)) {
    console.log('SEARCH: default -> active');
    changeElementState(searchForm, searchStates.active);
    subscribeToSubmit();
  }
});
