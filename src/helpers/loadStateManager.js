export const loadMessages = {
  start: 'start',
  end: 'end',
};

export const notifyLoadListener = (listeners, message) => {
  const loadListener = listeners.find((listener) => listener.isLoadListener);
  if (loadListener) {
    loadListener(message);
  }
};
