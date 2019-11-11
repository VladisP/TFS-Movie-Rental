import { searchStates } from '../helpers/containersStates.js';
import { changeContainerState } from '../helpers/changeContainerState.js';

export const manageSearchState = (searchForm, searchInput) => {
  searchInput.addEventListener('click', function listener() {
    if (searchForm.className !== searchStates.active) {
      changeContainerState(searchForm, searchStates.active);
    }
    searchInput.removeEventListener('click', listener);
  });

  const startCoords = searchForm.getBoundingClientRect().top;

  document.addEventListener('scroll', () => {
    if (
      window.pageYOffset < startCoords &&
      searchForm.className !== searchStates.active
    ) {
      changeContainerState(searchForm, searchStates.active);
    } else if (
      window.pageYOffset >= startCoords &&
      searchForm.className !== searchStates.scroll
    ) {
      changeContainerState(searchForm, searchStates.scroll);
    }
  });
};
