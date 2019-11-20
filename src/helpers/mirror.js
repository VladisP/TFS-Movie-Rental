export const mirror = (params, element) => {
  params.forEach((param) => {
    Object.defineProperty(element, param, {
      get() {
        return this.getAttribute(param);
      },
      set(value) {
        this.setAttribute(param, value);
      },
    });
  });
};
