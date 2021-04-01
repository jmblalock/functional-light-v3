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

console.log(Just(42));

var x = Just(42);

console.log(x);
