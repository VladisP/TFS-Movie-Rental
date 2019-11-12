export const getApplicationState = () => {
  const count = JSON.parse(sessionStorage.getItem('count') || '0');
  const results = JSON.parse(sessionStorage.getItem('results') || '[]');
  const error = JSON.parse(sessionStorage.getItem('error') || 'false');
  const searches = JSON.parse(localStorage.getItem('searches') || '[]');

  return {
    count,
    results,
    error,
    searches,
  };
};

export const setApplicationState = ({ count, results, error, searches }) => {
  sessionStorage.setItem('count', JSON.stringify(count));
  sessionStorage.setItem('results', JSON.stringify(results));
  sessionStorage.setItem('error', JSON.stringify(error));
  localStorage.setItem('searches', JSON.stringify(searches));
};
