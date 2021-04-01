function curry(fn) {
  return (arg) => {
    return (arg2) => {
      return fn(arg, arg2);
    };
  };
}

function Just(val) {
  return [map, chain, ap];

  function map(fn) {
    return Just(fn(val));
  }

  function chain(fn) {
    return fn(val);
  }

  function ap(anotherMonad) {
    return anotherMonad.map(val);
  }
}

var fortyOne = Just(41);
var fortyTwo = fortyOne.map(function inc(v) {
  return v + 1;
});

function identity(v) {
  return v;
}

console.log(fortyOne, fortyTwo);

var user1 = Just("Justin");
var user2 = Just("Remy");

var tuple = curry(function tuple(x, y) {
  return [x, y];
});

var users = user1.map(tuple);

console.log(users);
