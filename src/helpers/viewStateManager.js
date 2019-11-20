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
    if (searchForm.className === searchStates.default) {
      changeSearchState(searchStates.active);
    }
    searchInput.removeEventListener('click', listener);
  });

  const startCoords = searchForm.getBoundingClientRect().top;

  const addClone = () => {
    const tempClone = searchForm.cloneNode(true);
    tempClone.classList.add('temp-clone');
    tempClone.style.visibility = 'hidden';
    searchForm.parentElement.insertBefore(tempClone, searchForm);
  };

  const removeClone = () => {
    const firstChild = searchForm.parentElement.firstElementChild;
    if (firstChild.classList.contains('temp-clone')) {
      firstChild.remove();
    }
  };

  document.addEventListener('scroll', () => {
    if (
      window.pageYOffset < startCoords &&
      searchForm.className !== searchStates.active
    ) {
      removeClone();
      changeSearchState(searchStates.active);
    } else if (
      window.pageYOffset >= startCoords &&
      searchForm.className !== searchStates.scroll
    ) {
      addClone();
      changeSearchState(searchStates.scroll);
    }
  });

  searchForm.className =
    sessionStorage.getItem('searchState') || searchStates.default;
};
