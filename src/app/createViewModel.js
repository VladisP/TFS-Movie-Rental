export const createViewModel = (model) => {
  let state = model.getState();
  let resultsListener = null;
  let countListener = null;
  let errorListener = null;

  const update = (nextState) => {
    if (nextState.error && nextState.error === 'Movie not found!') {
      return (
        errorListener && errorListener('Мы не поняли о чем речь ¯\\_(ツ)_/¯')
      );
    } else if (nextState.error) {
      console.error(nextState.error);
      return (
        errorListener && errorListener('Случилась ошибка. Проверьте консоль.')
      );
    } else {
      errorListener && errorListener('');
    }

    if (nextState.results !== state.results) {
      resultsListener && resultsListener(nextState.results);
    }

    if (nextState.count !== state.count) {
      countListener && countListener(nextState.count);
    }

    state = nextState;
  };

  model.addListener(update);

  return {
    bindError: (listener) => (errorListener = listener),
    bindCount: (listener) => (countListener = listener),
    bindResults: (listener) => (resultsListener = listener),
    handleSearchSubmit: (searchTerm) => model.search(searchTerm),
  };
};
