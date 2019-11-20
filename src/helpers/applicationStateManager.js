class StateFieldDescription {
  constructor(name, defaultValue) {
    this.name = name;
    this.default = defaultValue;
  }
}

const stateFieldsDescriptions = {
  count: new StateFieldDescription('count', '0'),
  results: new StateFieldDescription('results', '[]'),
  error: new StateFieldDescription('error', 'false'),
  searches: new StateFieldDescription('searches', '[]'),
  cache: new StateFieldDescription('cache', '[]'),
};

export const getApplicationState = () => {
  const count = JSON.parse(
    sessionStorage.getItem(stateFieldsDescriptions.count.name) ||
      stateFieldsDescriptions.count.default
  );
  const results = JSON.parse(
    sessionStorage.getItem(stateFieldsDescriptions.results.name) ||
      stateFieldsDescriptions.results.default
  );
  const error = JSON.parse(
    sessionStorage.getItem(stateFieldsDescriptions.error.name) ||
      stateFieldsDescriptions.error.default
  );
  const searches = JSON.parse(
    localStorage.getItem(stateFieldsDescriptions.searches.name) ||
      stateFieldsDescriptions.searches.default
  );

  return {
    count,
    results,
    error,
    searches,
  };
};

export const setApplicationState = ({ count, results, error, searches }) => {
  sessionStorage.setItem(
    stateFieldsDescriptions.count.name,
    JSON.stringify(count)
  );
  sessionStorage.setItem(
    stateFieldsDescriptions.results.name,
    JSON.stringify(results)
  );
  sessionStorage.setItem(
    stateFieldsDescriptions.error.name,
    JSON.stringify(error)
  );
  localStorage.setItem(
    stateFieldsDescriptions.searches.name,
    JSON.stringify(searches)
  );
};

export const setSessionCache = (cache) => {
  sessionStorage.setItem(
    stateFieldsDescriptions.cache.name,
    JSON.stringify(Array.from(cache.entries()))
  );
};

export const getSessionCache = () => {
  return JSON.parse(
    sessionStorage.getItem(stateFieldsDescriptions.cache.name) ||
      stateFieldsDescriptions.cache.default
  );
};
