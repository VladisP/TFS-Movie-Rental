export const makeAttributeChangingMap = (attrChangedCallbacks, element) => {
  const attributeChangingMap = {};

  Object.entries(attrChangedCallbacks).forEach(([param, callback]) => {
    Object.defineProperty(attributeChangingMap, param, {
      value: callback.bind(element),
    });
  });

  return attributeChangingMap;
};
