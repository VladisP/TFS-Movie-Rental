import { mapMovie } from '../helpers/mapMovie.js';

export const createModel = () => {
  let state = {
    count: 0,
    results: [],
    error: false,
  };

  let listeners = [];

  const addListener = (listener) => listeners.push(listener);

  const setState = (update) => {
    state = Object.assign({}, state, update);
    listeners.forEach((listener) => listener(state));
  };

  const getState = () => state;

  const search = async (searchTerm) => {
    setState({
      count: 0,
      results: [],
      error: false,
    });

    try {
      const data = await fetch(
        `http://www.omdbapi.com/?apikey=2fe365ef&type=movie&s=${searchTerm}`
      ).then((r) => r.json());

      if (data.Response === 'True') {
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

  return {
    addListener,
    setState,
    getState,
    search,
  };
};
