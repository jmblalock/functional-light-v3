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

var someObj = { something: { else: { entirely: 42 } } };
console.log(someObj.something.else.entirely);

function Nothing() {
  return { map: Nothing, chain: Nothing, ap: Nothing };
}

var Maybe = { Just, Nothing, of: Just };

function fromNullable(val) {
  if (val == null) return Maybe.Nothing();
  else return Maybe.of(val);
}

var prop = curry(function prop(prop, obj) {
  return fromNullable(obj[prop]);
});

console.log(prop);

Maybe.of(someObj)
  .chain(prop("something"))
  .chain(prop("else"))
  .chain(prop("entirely"));
