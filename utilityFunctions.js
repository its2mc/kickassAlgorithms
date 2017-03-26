/*
 *  Javascript utility functions I found to be kickass.. either due to their computatioonal efficiency,
 *  or their line count or on how cool they are. :D  
 *  ps Mutating algorithms are prepended with _ while nonmutating are not prepended
 */

/**
 * **warning** 
 * This algorithm mutates the input data, a non mutating version of the algorithm iss hown below
 * its one line longer. :()
 * **warning** 
 * 
 * This function iterates through an array of objects and aggregates a chosen field from the objects and deletes objects that are not unique according to the given field
 * @param {Array} arr Array containing obj values
 * @param {String} uniqField String describing the field in the object to check for uniqueness
 * @param {String} aggrField String describing the field containing aggregation values
 * @return null, the array is mutated and does not need to be returned
 */
function _uniqByAggregate(arr, uniqField, aggrField) {
    for (let i = 0, j = 1; i < arr.length - 1; ++j, ((!(j < arr.length)) ? (++i, j = i + 1) : null))(arr[i][uniqField] === arr[j][uniqField]) ? (arr[i][aggrField] += (arr.splice(j, 1))[0][aggrField], j--) : null;
}

/**
 * **warning** 
 * This algorithm mutates the input data, a non mutating version of the algorithm iss hown below
 * its one line longer. :()
 * **warning** 
 * 
 * This function iterates through an array of objects and aggregates a chosen field from the objects and deletes objects that are not unique according to the given field
 * @param {Array} arr Array containing obj values
 * @param {String} uniqField String describing the field in the object to check for uniqueness
 * @param {String} aggrField String describing the field containing aggregation values
 * @return null, the array is mutated and does not need to be returned
 */
function _uniqBy(arr, uniqField) {
    for (let i = 0, j = 1; i < arr.length - 1; ++j, ((!(j < arr.length)) ? (++i, j = i + 1) : null))(arr[i][uniqField] === arr[j][uniqField]) ? (arr.splice(j, 1), j--) : null;
}


/**
 * **warning** 
 * This algorithm does not mutate the input algorithm, bt it is slightly slower
 * **warning** 
 * 
 * This function iterates through an array of objects and aggregates a chosen field from the objects and deletes objects that are not unique according to the given field
 * @param {Array} arr Array containing obj values
 * @param {String} uniqField String describing the field in the object to check for uniqueness
 * @param {String} aggrField String describing the field containing aggregation values
 * @param {Array} res Result array, this is used to make the algorithm non mutating, you can also seed your own result array into the 
 *                      algorithm if it suits your application This allows you to seed a prefilled array
 * @return {Array} res The resulting array is returned
 */
function uniqByAggregate(arr, uniqField, aggrField, res = arr.splice()) {
    for (let i = 0, j = 1; i < res.length - 1; ++j, ((!(j < res.length)) ? (++i, j = i + 1) : null))(res[i][uniqField] === res[j][uniqField]) ? (res[i][aggrField] += (res.splice(j, 1))[0][aggrField], j--) : null;
    return res;
}


/**
 * **warning** 
 * This algorithm does not mutate the input algorithm, bt it is slightly slower
 * **warning** 
 * 
 * This function iterates through an array of objects and deletes objects that are not unique according to the given field
 * @param {Array} arr Array containing obj values
 * @param {String} uniqField String describing the field in the object to check for uniqueness
 * @param {Array} res Result array, this is used to make the algorithm non mutating, you can also seed your own result array into the 
 *                      algorithm if it suits your application This allows you to seed a prefilled array
 * @return {Array} res The resulting array is returned
 */
function uniqBy(arr, uniqField, res = arr.splice()) {
    for (let i = 0, j = 1; i < res.length - 1; ++j, ((!(j < res.length)) ? (++i, j = i + 1) : null))(res[i][uniqField] === res[j][uniqField]) ? (res.splice(j, 1), j--) : null;
    return res;
}

/**
 * Cannot claim credit for this one,... yet.. :D 
 * found a kick ass way to safely get nested properties from an object..
 * @param {Array} props Array containing obj properties
 * @param {Object} obj String describing the field in the object to check for uniqueness
 * @return {any} The value of the property accessed is returned
 */
function safeGet(props, obj) {
    return (props && obj && props.length > 0) ? (props.reduce((acc, prop) => (acc[prop]) ? acc[prop] : null, obj)) : null;
}
//ES6 Goodness
let safeGet = (props, obj) => (props && obj && props.length > 0) ? (props.reduce((acc, prop) => (acc[prop]) ? acc[prop] : null, obj)) : null;



/**
 * This algorithm compensates for a javascripts non strict typing by comparing an object with 
 * the type of a template object. This is more reliable to determine types.
 * @param {any} obj Object you want to compare
 * @param {any} template A template of the object that you want to compare the type of it to
 * @param {function} toString function that gets the type string of an object/variable
 * @return {boolean} Boolean value indicating whether the objects match types or not
 */
function typeOf(obj, template, toString = Object.prototype.toString) {
    return (obj === undefined || obj === null || template === undefined || template === null) ? false : (toString.call(obj) === toString.call(template)) ? true : false;
}
let typeOf = (obj, template, toString = Object.prototype.toString) => (obj === undefined || obj === null || template === undefined || template === null) ? false : (toString.call(obj) === toString.call(template)) ? true : false;



/**
 * This is a function does a shallow comparison of two arrays,
 * It is only limited to 1 level , hoping to modify it to accomodate lower levels
 * I have to be createive to limit it to one line.. :D 
 * @param {Array} arr1 First comparison array
 * @param {Array} arr2 Second comparison array
 * @param {boolean function} isArr  Function that checks if the objets are indeed arrays.
 * @param {boolean} flag  returns true if the arrays are the same, returns fales if they are different
 */
let compArr = (arr1, arr2, isArr = (arr) => Object.prototype.toString.call(arr) === "[object Array]", flag = true) => (!arr1 || !arr2 || !isArr(arr1) || !isArr(arr2) || (arr1.length !== arr2.length)) ? false : (arr1.map((val, i) => (val !== arr2[i]) ? flag = false : null), flag);



/**
 * Performing a N^2 loop with one line.
 * This loop performs a double loop with only one line, can save space by removing the necessity 
 * of using a second for loop.
 * The second loop loops loop2_len times while the first loop loops loop1_len times
 */
for (let i = 0, j = 0; i < loop1_len;
    (j < loop2_len - 1) ? ++j : (j = 0, ++i)) console.log("hey");