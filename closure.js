// let a, setA;
// function outer() {
//   let b = 10;
//   function c() {}
//   function log() {
//     console.log(b);
//   }
//   function setB(input) {
//     b = input;
//   }
//   document.addEventListener('click', () => {
//     console.log();
//   });
//   a = log;
//   setA = setB;
// }

// outer();
//
//
//
//
//
//
//
//
//
//
//
//
// let a, setA;
// function outer() {
//   let b = 10;
//   let c = 20;
//   function log() {
//     console.log(b);
//   }
//   function setB(input) {
//     b = input;
//   }
//   document.addEventListener('click', function () {
//     console.log(c);
//   });
//   a = log;
//   setA = setB;
// }

// outer();

// if (true) {
//   let b = 10;
//   function log() {
//     console.log(b);
//   }
//   function setB(input) {
//     b = input;
//   }
//   a = log;
//   setA = setB;
// }

// const debounce = (cb, time) => {
//   let a;

//   return function () {
//     clearTimeout(a);
//     a = setTimeout(cb, time);
//   };
// };

// const onClick = () => {
//   console.log('click!!!!',Date.now());
// };

// const debounceClick = debounce(onClick, 1000);

let res;

function outer() {
  let largeData = new Array(10000000);
  let oldRes = res;

  function inner() {
    if (oldRes) return largeData;
  }

  return function () {};
}

// setInterval(() => {
//   res = outer();
// }, 1000);
// res = outer();
// res = outer();
// res = outer();

// setInterval(() => {
//   res = outer();
// }, 2000);

// {
//   let largeData = new Array(10000000);
//   let oldRes = res;

//   /* Unused but leaks? */
//   function inner() {
//     if (oldRes) return largeData;
//   }

//   res = function () {};
// }
