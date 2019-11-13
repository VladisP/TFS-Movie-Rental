import { mapMovie } from '../helpers/mapMovie.js';
import {
  getApplicationState,
  setApplicationState,
  getSessionCache,
  setSessionCache,
} from '../helpers/applicationStateManager.js';
import {
  loadMessages,
  notifyLoadListener,
} from '../helpers/loadStateManager.js';
import { getMoreMoviesInfo } from '../helpers/getMoreMoviesInfo.js';

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
      let data = null;

      if (searchCache.has(searchTerm)) {
        data = searchCache.get(searchTerm);
      } else {
        notifyLoadListener(listeners, loadMessages.start);

        data = await fetch(
          `http://www.omdbapi.com/?apikey=2fe365ef&type=movie&s=${searchTerm}`
        ).then((r) => r.json());

        if (data.Response !== 'True') {
          throw data.Error;
        }

        data = await getMoreMoviesInfo(data);
      }

      if (!searchCache.has(searchTerm)) {
        searchCache.set(searchTerm, data);
        setSessionCache(searchCache);
      }

      setState({
        count: data.count,
        results: data.moviesInfo.map(mapMovie),
      });
    } catch (error) {
      setState({ error });
    } finally {
      notifyLoadListener(listeners, loadMessages.end);
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
