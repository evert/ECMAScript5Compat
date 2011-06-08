/**
 * Enabling js strict mode
 */
"use strict";

/**
 * Creates a new object based on the specified prototype object.
 *
 * This is not a complete implementation. The ECMAScript 5 implementation has
 * support for 'properties', which is a brand-new feature.
 *
 * If an attempt is made to use the properties feature, an exception will be
 * thrown.
 *
 * Example:
 * var Chicken = Object.create(Bird);
 *
 */
if (!Object.create) {

    Object.create = function (o, properties) {
        
        if (properties !== undefined) {
            throw "The 'properties' feature from Object.create is not supported";
        }

        function F() {}
        F.prototype = o;
        return new F();

    };
};

/**
 * The **bind** function creates a new function that 'wraps' the specified
 * function. When this function is called, it calls the inner function in the
 * context of the provided **this** value.
 *
 * If any additional argments are passed, these are used as the 'first few'
 * arguments in the given function.
 *
 * The contents of this function is largely copied from [MDC][mdc]
 *
 * [mdc]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
 */
if (!Function.prototype.bind) {

    Function.prototype.bind = function(inner) {

        /* The 'arguments' array is not a true array, and does not have a
           slice function. So we're using the Array slice function on it. */
        var slicer = Array.prototype.slice,
            args = slicer.call(arguments, 1),

            self = this,

            /* empty constructor, to fix scoping issues(?) */
            nop = function () { } 

            /* This is the closure we're returning */
            bound = function() {
                
                /* This line confused me too */
                var context = this instanceof nop ? this : ( inner || {} );

                /* Calling the inner function */
                return self.apply(context, args.concat(slicer.call(arguments,1)));

            };

        nop.prototype = this.prototype;
        bound.prototype = new nop();

        return bound;

    }

}

/**
 * The **forEach** method on arrays loops through the array, and executes
 * a function for every element.
 *
 * Optionally you can pass a 'this' object, which will be used as the 'this'
 * context in the inner function. 
 *
 * The arguments passed to the function are:
 *   1. The current element
 *   2. The index
 *   3. The entire array (again)
 *
 * Example:
 *
 * var arr = ['a', 'b', 'c'];
 * arr.forEach(function(elem, index) {
 *
 *     console.log(index + ': ' + elem);
 *
 * });
 *
 * This example script will output:
 * 0: a
 * 1: b
 * 2: c
 */
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function(callback, thisObject) {

        if (typeof callback !== "function")
            throw new TypeError();

        for(var ii=0; ii < this.length; ii++) {

            /* Skipping undefined elements */
            if (ii in this) {
               callback.call(thisObject, this[ii], ii, this); 
            }
        }

    }

} 
