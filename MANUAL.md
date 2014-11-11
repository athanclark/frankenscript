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

*Unification*

### Currently Working Version
Javascript natively has a few different types, as found by the `[[Class]]`
attribute noted in Javascript garden. Here they are:

TODO

The only thing that isn't found is `undefined`, which we can still chain
in our type checker. Note that `Object` and `Function` are as far as they
go for `is` - however, we can do a number of things now. We can search for
the existence of a property in an object (or it's prototype chain), and also, if
we make a type signature declaration system in javascript, we will have a
functional type signature there also. Using this information, we can make
some basic type enforcement in functions. The real beauty will come from defining
our own (higher kinded) types and aliases. This would require a global storage system
(in `Ughh`).

Using an explicit `return` statement and a custom "immutable" wrapper would also allow
us to infer the type signatures of parametrically polymorphic functions, while also being
assured the contents aren't toyed with. Also, an explicit `rec` function would give us
the capacity to have truly lazy computation, giving rise to fixpoints (with type inference).


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
