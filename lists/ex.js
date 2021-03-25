"use strict";

function one() {
  return 1;
}

function two() {
  return 2;
}

function add(x, y) {
  return x + y;
}

console.log(add(one(), two())); // 3

function add2(fn1, fn2) {
  return add(fn1(), fn2());
}

console.log(add2(one, two)); // 3

function three(v) {
  return function f() {
    return v;
  };
}

console.log(add2(three(1), three(2))); // 3

// with recursion:
function addn([fn0, fn1, ...rest]) {
  if (rest.length == 0) return add2(fn0, fn1);

  return addn([
    function f() {
      return add2(fn0, fn1);
    },
    ...rest,
  ]);
}

var vals = [7, 4, 8, 0, 10, 7, 3, 2, 5, 9, 12, 6, 4, 1, 7, 8];

// with reduce:
// function addn(fns) {
//   return fns.reduce(function reducer(composedFn, fn) {
//     return function f() {
//       return add2(composedFn, fn);
//     };
//   })();
// }

// with iteration:
// function addn(fns) {
// 	while (fns.length > 2) {
// 		let [fn0,fn1,...rest] = fns;
// 		fns = [
// 			function f(){
// 				return add2(fn0,fn1);
// 			},
// 			...rest
// 		];
// 	}
// 	return add2(fns[0],fns[1]);
// }

console.log(
  addn(
    vals
      .reduce(function reducer(a, v) {
        if (!~a.indexOf(v)) return a.concat(v);
        return a;
      }, [])
      //.filter(function(v,i,arr){
      //    return i == arr.indexOf(v);
      //})
      .filter(function filterer(v) {
        return v % 2 == 0;
      })
      .map(three)
  )
);
// 42
