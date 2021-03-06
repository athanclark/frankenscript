FrankenScript
=============

> It's ALLLIIIIIVEEEEEEE!

Just kidding, that would be cool, though.

__Status__: _Experimental_

--------

## Introduction
FrankenScript is a Partial Application utility for JavaScript.

## Usage

Let's dissect addition and turn it into a monstrosity. Here is an explicit
addition function, `plus`:

```javascript
function plus(n,m) {
  return n+m;
}
```

Very standard. Now, in order to mutilate arbitrary functions and
turn them into nightmares, we use `Uhgg`.

```javascript
var frankenPlus = Ughh(plus);
```
...which is pronounced __groan__. `frankenPlus` can make for some pretty abbominable arithmetic! Watch in horror
as we attach the dismembered parameters and get our desired solution:

```javascript
var frankenPlus1 = frankenPlus(1);

frankenPlus1(2);
➥ 3

frankenPlus1(3);
➥ 4
```

Now that `frankenPlus` has the strength of a hundred functions, we can _really_ be a
mad (computer) scientist! For instance, `zipWith`:

```javascript
var set1 = [1,2,3,4,5];
var set2 = [1,2,3,4,5,6];

zipWith(frankenPlus, set1, set2);
➥ [ 2, 4, 6, 8, 10 ]
```
or, equivalently with [Underscore](http://underscorejs.org)'s map & element-wise application:

```javascript
var plusN = _.map(set1, frankenPlus);

app(plusN, set2);
➥ [ 2, 4, 6, 8, 10 ]
```

Both `zipWith` and `app` are taken from [Haskell](http://haskell.org).

## Addons

### Chunked Application
[Lo-Dash](https://lodash.com/docs#curry) has a `curry` function that does something similar to
the partial application examples above, but it blends between JavaScript's multiple parameters 
and chained invocations. Now, I've included the same functionality so we can do fun stuffs like
this:

```javascript
var plus4 = function (a,b,c,d){
  return a+b+c+d;
}
var frankenPlus4 = Ughh(plus4);

frankenPlus4(1)(2)(3)(4);
➥ 10

frankenPlus4(1,2)(3,4);
➥ 10

frankenPlus4(1)(2,3,4);
➥ 10
```

I have an issue calling this `curry`, because JavaScript's native multi-parameter function application
`(,)` is not a tuple or product functor - it's not even a value, however it might be unique.
Regardless, you can't say it's the product functor _universally_, because it's not first-class. I'm going
to try and make a proper `curry` / `uncurry` that respects the adjoint, but first I need a lambda
calculus.

### Trivial Type Checking
We now have a very, very trivial method to declaring type signatures for your function. Observe:
```javascript
var plusT = Ughh.typed("Number -> Number -> Number", function (n,m) {return n+m});

plusT;
➥ { [Function: func] typeSig: 'Number -> Number -> Number' }

plusT(1);
➥ { [Function: func] typeSig: 'Number -> Number' }

plusT(1)(2);
➥ 3

plusT(1)("foo");
➥ [Error: Parameter(s) does not match type signature]
```

## TODO

- Hindley-Milner parametric polymorphism type inference
- Incremental (pseudo) type checking and signature declaration / binding
- Fixpoint termination with explicit recursion
- Lazy and Eager evaluation schemes
