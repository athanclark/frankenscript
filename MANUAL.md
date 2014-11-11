FrankenScript Manual
====================

## Type Signatures

For our purposes, we adopt Haskell's syntax for declaring type signatures.

Examples:

```
Foo -> Bar
String -> Bool
forall a. a -> a
forall a, b. a -> b -> a
```


### Issues

It is impossible to infer a raw, trivial, JavaScript function's "type" from
within javascript (unless you made a javascript compiler / parser in javascript
for your host.... yeah I don't want that.). This leaves us one incentive for
people to inform us of it's type: _garuntees_.

It would be nice to limit apis in javascript at the user-level - to literally
stop a user from invoking a function with the wrong type. This would eliminate
the necessity for miles of documentation, as well as a class of bugs. Sweet.

Also, the resulting type could be used for personal rigour - stating a function
to have a type `Foo -> Bar -> Bar` _forces_ you to return a `Bar` - but how to we
force _return values_ to be well typed? The catch: You can't use JavaScript's normal
`return` keyword. Having a manual return function would be useful for fixpoints
also, so meh.

Also, Higher-kinded / parametric types, like _actual_ Lists (in Haskell), or Tuples.
This creates an issue for JavaScript `Array`s, because they are both heterogeneous
and unbounded. `Objects` have a similar issue - however, we do have a form of
(unchecked) Row-polymorphic subtyping in JavaScript Objects & Prototypes.

Making types will also be a pain.
