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
 * This function iterates through an array of objects and aggregates a chosen field from the objects
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
 * This algorithm does not mutate the input algorithm, bt it is slightly slower
 * **warning** 
 * 
 * This function iterates through an array of objects and aggregates a chosen field from the objects
 * @param {Array} arr Array containing obj values
 * @param {String} uniqField String describing the field in the object to check for uniqueness
 * @param {String} aggrField String describing the field containing aggregation values
 * @param {Array} res Result array, this is used to make the algorithm non mutating, you can also seed your own result array into the 
 *                      algorithm if it suits your application This allows you to seed a prefilled array
 * @return {Array} arr The resulting array is returned
 */
function uniqByAggregate(arr, uniqField, aggrField, res = arr.splice()) {
    for (let i = 0, j = 1; i < res.length - 1; ++j, ((!(j < res.length)) ? (++i, j = i + 1) : null))(res[i][uniqField] === res[j][uniqField]) ? (res[i][aggrField] += (res.splice(j, 1))[0][aggrField], j--) : null;
    return res;
}