/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
        /*
        Не знаю какой предпочтителтный вариант, напишите пожауйлста потом! =)
        newArray[i] = fn(array[i], i, array);
        */
        newArray.push(fn(array[i], i, array));
    }

    return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var variable;
    var i;

    if (initial) {
        variable = initial;
        i = 0;
    } else {
        variable = array[0];
        i = 1;
    }

    for (i; i < array.length; i++) {
        variable = fn(variable, array[i], i, array);
    }

    return variable;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    /*
    еще один пример решения
    if ( obj.hasOwnProperty( prop ) )
    */
    if (prop in obj) {
        return true;
    }

    return false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var keys = Object.keys(obj);

    return keys;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var array = [];

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            prop = prop.toUpperCase();
            array.push(prop);
        }
    }

    return array;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to = array.length) {
    var newArray = [];
    var end = array.length;
    var i = 0;

    if ((from < 0 ) && (array.length + from) > 0) {
        i = array.length + from;
    }

    if (from > 0) {
        i = from;
    }

    if (to < 0) {
        end = array.length + to;
    }

    if ((to > 0) && (to <= array.length)) {
        end = to;
    }

    if (to === 0) {
        end = 0;
    }

    for (i; i < end; i++) {
        newArray.push(array[i]);
    }

    return newArray;
}
/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    var proxy = new Proxy(obj, {
        set: function (obj, prop, value) {
            obj[prop] = (value * value);

            return true;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
