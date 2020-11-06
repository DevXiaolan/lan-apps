const render = $ => {
  return Promise.resolve();
};

(global => {
  global['your_name'] = {
    bootstrap: () => {
      console.log('your_name bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('your_name mount');
      return render($);
    },
    unmount: () => {
      console.log('your_name unmount');
      return Promise.resolve();
    },
  };
})(window);