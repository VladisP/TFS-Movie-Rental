import { makeRequests } from './makeRequests.js';

export const getMoreMoviesInfo = async (data) => {
  const urls = data.Search.map(
    (movie) =>
      `http://www.omdbapi.com/?apikey=2fe365ef&type=movie&i=${movie.imdbID}`
  );

  const moviesInfo = await makeRequests(urls, 6);

  return {
    moviesInfo,
    count: data.totalResults,
  };
};
