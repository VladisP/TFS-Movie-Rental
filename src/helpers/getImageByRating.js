export const getImageByRating = (rating) => {
  if (rating < 3) {
    return '/src/images/icons/awful.png';
  } else if (rating < 5) {
    return '/src/images/icons/very-bad.png';
  } else if (rating < 6) {
    return '/src/images/icons/bad.png';
  } else if (rating < 8) {
    return '/src/images/icons/good.png';
  } else {
    return '/src/images/icons/perfect.png';
  }
};
