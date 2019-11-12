import { mapMovie } from '../helpers/mapMovie.js';
import {
  getApplicationState,
  setApplicationState,
  getSessionCache,
  setSessionCache,
} from '../helpers/applicationStateManager.js';

export const createModel = () => {
  let state = getApplicationState();

  let listeners = [];

  const addListener = (listener) => listeners.push(listener);

  const setState = (update) => {
    state = Object.assign({}, state, update);
    listeners.forEach((listener) => listener(state));
    setApplicationState(state);
  };

  const getState = () => state;

  const searchCache = new Map(getSessionCache());

  const search = async (searchTerm) => {
    searchTerm = searchTerm.toLowerCase();

    setState({
      count: 0,
      results: [],
      error: false,
      searches: [searchTerm].concat(
        state.searches.filter((term) => term !== searchTerm)
      ),
    });

    try {
      const data = searchCache.has(searchTerm)
        ? searchCache.get(searchTerm)
        : await fetch(
            `http://www.omdbapi.com/?apikey=2fe365ef&type=movie&s=${searchTerm}`
          ).then((r) => r.json());

      if (data.Response === 'True') {
        if (!searchCache.has(searchTerm)) {
          searchCache.set(searchTerm, data);
          setSessionCache(searchCache);
        }
        setState({
          count: data.totalResults,
          results: data.Search.map(mapMovie),
        });
      } else {
        setState({
          error: data.Error,
        });
      }
    } catch (error) {
      setState({ error });
    }
  };

  const removeTag = (searchTerm) => {
    setState({
      searches: state.searches.filter((term) => term !== searchTerm),
      error: false,
    });
  };

  return {
    addListener,
    setState,
    getState,
    search,
    removeTag,
  };
};
