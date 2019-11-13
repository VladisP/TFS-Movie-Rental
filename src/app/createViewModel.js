export const createViewModel = (model) => {
  let state = {};
  let resultsListener = null;
  let countListener = null;
  let errorListener = null;
  let searchesListener = null;

  const update = (nextState) => {
    if (nextState.searches !== state.searches) {
      searchesListener && searchesListener(nextState.searches);
    }

    if (nextState.error && nextState.error === 'Movie not found!') {
      return (
        errorListener && errorListener('Мы не поняли о чем речь ¯\\_(ツ)_/¯')
      );
    } else if (nextState.error) {
      console.error(nextState.error);
      return (
        errorListener && errorListener('Случилась ошибка. Проверьте консоль.')
      );
    }

    if (nextState.results !== state.results) {
      resultsListener && resultsListener(nextState.results);
    }

    if (nextState.count !== state.count) {
      countListener && countListener(nextState.count);
    }

    state = nextState;
  };

  return {
    bindError: (listener) => (errorListener = listener),
    bindCount: (listener) => (countListener = listener),
    bindResults: (listener) => (resultsListener = listener),
    bindSearches: (listener) => (searchesListener = listener),
    bindLoading: (listener) => model.addListener(listener),
    handleSearchSubmit: (searchTerm) => model.search(searchTerm),
    handleTagClick: (searchTerm) => model.search(searchTerm),
    handleTagRemove: (searchTerm) => model.removeTag(searchTerm),
    init: () => {
      update(model.getState());
      model.addListener(update);
    },
  };
};
