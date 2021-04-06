const importReact = function () {
  let state;
  return {
    useState(initialValue) {
      state = state || initialValue;
      function setState(newVal) {
        if (state !== newVal) {
          state = newVal;
          console.log('re-render');
        } else {
          console.log('state unchanged');
        }
      }
      return [state, setState];
    },
  };
};

let { useState } = importReact();

let count = () => {
  let [a, setA] = useState(0);
  setA(a + 1);
  // return setA;
};

let doubleCount = () => {
  let [a, setA] = useState(0);
  setA(a * 2);
  // return setA;
};

let logCount = () => {
  let [a] = useState(0);
  console.log(a);
};

const singleton = (cb) => () => {
  const [singletonObject] = useState(cb());
  return singletonObject;
};
