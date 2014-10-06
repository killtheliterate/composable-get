# Composable Get
This is a tiny utility that provides a curried function for traversing objects and
plucking values. It's primary use-case is one in which it is composed with other
functions while traversing a large object.

One benefit of using this module is that it should look for things safely,
without exploding when an undefined object is searched.

## Examples:
```
// Straight-up
var colors = getDesc('colors')(objectWithColorsProperty);

// Composed
var getDesc = function(name) {
    return _.compose(
        get('desc'),
        _.partialRight(_.find, function(color) {
            return color.name === name;
        }),
        get('colors')
    );
};

var descForRed = getDesc('red')(objectWithColorsProperty);
```
