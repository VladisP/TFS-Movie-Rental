export const manageSearchState = (searchForm, searchInput) => {
  const searchStates = {
    default: 'search-wrapper-default',
    active: 'search-wrapper-active',
    scroll: 'search-wrapper-scroll',
  };

  const changeSearchState = (newState) => {
    searchForm.className = '';
    searchForm.classList.add(newState);

    sessionStorage.setItem('searchState', searchForm.className);
  };

  searchInput.addEventListener('click', function listener() {
    if (searchForm.className !== searchStates.active) {
      changeSearchState(searchStates.active);
    }
    searchInput.removeEventListener('click', listener);
  });

  const startCoords = searchForm.getBoundingClientRect().top;

  document.addEventListener('scroll', () => {
    if (
      window.pageYOffset < startCoords &&
      searchForm.className !== searchStates.active
    ) {
      changeSearchState(searchStates.active);
    } else if (
      window.pageYOffset >= startCoords &&
      searchForm.className !== searchStates.scroll
    ) {
      changeSearchState(searchStates.scroll);
    }
  });

  searchForm.className =
    sessionStorage.getItem('searchState') || searchStates.default;
};
