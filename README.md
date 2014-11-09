FrankenScript
=============

> It's ALLLIIIIIVEEEEEEE!

Just kidding, that would be cool, though.

--------

## Introduction
FrankenScript is a Partial Application utility for JavaScript.

## Usage

Let's make partially evaluating addition. Here is an explicit
addition function, `plus`:

```javascript
function plus(n,m) {
  return n+m;
}
```

very standard. Now, we can turn addition into a monster to do
arithmetic like a proper abomonation:

```javascript
var frankenPlus = Ughh(plus);
```

And as we attach the dismembered parameters, we get our solution:

```javascript
frankenPlus1 = frankenPlus(1);
frankenPlus1(2);

-> 3
```
