export const makeRequests = (urls, maxRequests) => {
  const uniqueUrls = Array.from(new Set(urls));
  const results = new Array(uniqueUrls.length);

  let nextUrlIndex = maxRequests;

  let completedRequestsCount = 0;

  return new Promise((resolve, reject) => {
    function startRequest(url, index) {
      fetch(url)
        .then((result) => result.json())
        .then((result) => {
          results[index] = result;
          completedRequestsCount += 1;
          if (completedRequestsCount === uniqueUrls.length) {
            resolve(results);
          } else if (nextUrlIndex < uniqueUrls.length) {
            startRequest(uniqueUrls[nextUrlIndex], nextUrlIndex);
            nextUrlIndex += 1;
          }
        })
        .catch((error) => reject(error));
    }

    uniqueUrls
      .slice(0, maxRequests)
      .map((url, index) => startRequest(url, index));
  })
    .then((res) => urls.map((url) => res[uniqueUrls.indexOf(url)]))
    .catch((error) => error);
};
