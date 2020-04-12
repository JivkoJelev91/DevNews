export const debounce = (fn, delay) => {
    var timer = null;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

export const uniqueBy = (array, key) => [...new Map(array.map(item => [item[key], item])).values()];
