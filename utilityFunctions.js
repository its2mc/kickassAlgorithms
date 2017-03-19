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
 */
function _uniqByAggregate(arr) {
    for (let i = 0, j = 1; i < arr.length - 1; ++j, ((!(j < arr.length)) ? (++i, j = i + 1) : null))
        (arr[i].keyword === arr[j].keyword) ? (arr[i].freq += (arr.splice(j, 1))[0].freq, j--) : null;
    return arr;
}


/**
 * **warning** 
 * This algorithm does not mutate the input algorithm, bt it is one line longer than the previous one
 * and it is slightly slower
 * **warning** 
 * 
 * This function iterates through an array of objects and aggregates a chosen field from the objects
 */
function uniqByAggregate(arr) {
    let res = arr.splice();
    for (let i = 0, j = 1; i < res.length - 1; ++j, ((!(j < res.length)) ? (++i, j = i + 1) : null))
        (res[i].keyword === res[j].keyword) ? (res[i].freq += (res.splice(j, 1))[0].freq, j--) : null;
    return res;
}