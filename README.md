FrankenScript
=============

> It's ALLLIIIIIVEEEEEEE!

Just kidding, that would be cool, though.

__Status: Experimental__

--------

## Introduction
FrankenScript is a Partial Application utility for JavaScript.

## Usage

Let's dissect addition into a monstrosity. Here is an explicit
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
`frankenPlus` can make for some pretty abbominable arithmetic! Watch -
as we attach the dismembered parameters, we get our desired solutions:

```javascript
var frankenPlus1 = frankenPlus(1);

frankenPlus1(2);
➩ 3

frankenPlus1(3);
➩ 4
```

With the strength of a thousand functions, `frankenPlus` can do some
pretty crazy stuff. For instance, `zipWith`:

```javascript
var set1 = [1,2,3,4,5];
var set2 = [1,2,3,4,5,6];

zipWith(frankenPlus, set1, set2);
➩ [ 2, 4, 6, 8, 10 ]
```
or, equivalently with Underscore's map & element-wise application:

```javascript
var plusN = _.map(set1, frankenPlus);

app(plusN, set2);
➩ [ 2, 4, 6, 8, 10 ]
```

## TODO

- Hindley-Milner parametric polymorphism type inference
- Incremental (pseudo) type checking and signature declaration / binding
- Fixpoint termination with explicit recursion
- Lazy and Eager evaluation schemes
