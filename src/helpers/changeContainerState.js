export const changeContainerState = (element, state) => {
  element.className = '';
  element.classList.add(state);
};
