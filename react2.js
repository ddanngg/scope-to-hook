const importReact2 = function () {
  let rerender = false;
  let state;
  let currentState;
  return {
    refreshState() {
      currentState = undefined;
      rerender = true;
    },
    useState(initialValue) {
      if (rerender) {
        let returnState = (currentState = !currentState
          ? state
          : currentState.next);
        function setState(newVal) {
          if (returnState.value !== newVal) {
            returnState.value = newVal;
            // console.log('re-render');
          } else {
            console.log('state unchanged');
          }
        }
        return [returnState.value, setState];
      } else {
        if (state) {
          currentState.next = {
            value: initialValue,
          };
          currentState = currentState.next;
        } else {
          state = {
            value: initialValue,
          };
          currentState = state;
        }
        let returnState = currentState;
        function setState(newVal) {
          if (returnState.value !== newVal) {
            returnState.value = newVal;
            console.log('re-render');
          } else {
            console.log('state unchanged');
          }
        }
        return [returnState.value, setState];
      }
    },
  };
};

const { useState, refreshState } = importReact2();

function innerFunc(double, fiveTimes, tenTimes) {
  const [a, setA] = useState(double);
  const [b, setB] = useState(fiveTimes);
  const [c, setC] = useState(tenTimes);

  setA(a * 2);
  setB(b * 5);
  setC(c * 10);
  refreshState();
  return { a, b, c };
}

function outerFunc() {
  const { a, b, c } = innerFunc(1, 2, 3);
  console.log('a: ', a);
  console.log('b: ', b);
  console.log('c: ', c);
}

// outerFunc();

function updateFunctionComponent() {
  //re-render : false
  prepareHooks();
  Component();
  finishHooks(); // re-render = true
  //finishHooks === refreshState
}

const memoize = (cb) => (...args) => {
  let [prevArgs, setPrevArgs] = useState([]);
  let [prevReturn, setPrevReturn] = useState();
  const argsArr = Array.from(args);

  if (
    prevArgs.length &&
    prevArgs.every((arg, index) => arg === argsArr[index])
  ) {
    refreshState();
    return prevReturn;
  } else {
    setPrevArgs(argsArr);
    const newReturn = cb(...argsArr);
    setPrevReturn(newReturn);
    refreshState();
    return newReturn;
  }
};

const createObj = (number) => ({ a: number });

const memoCreateObj = memoize(createObj);
