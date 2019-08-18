class sPromise extends Promise {

    constructor(executor) {

        this._caseTag = [];
        this._caseFunc = [];

        this._promise = super((resolve, reject) => {
            return executor(resolve, reject);
        });

    }

    case (_case, _cb) {
        if (!!_case && typeof _case == "String") {
            this._caseTag.push({ c: "==", case: _case });
            this._caseFunc.push(_cb);
        }
        return this;
    }

    strictCase(_case, _c) {
        if (!!_case && typeof _case == "String") {
            this._caseTag.push({ c: "===", case: _case });
            this._caseFunc.push(_cb);
        }
        return this;
    }

    //This function executes the case conditions
    switch () {
        try {
            this._promise.then(comparator => {
                if (this._caseTag.length) {
                    this._switch = (this._caseFunc.filter((tag, index) => {
                        switch (this.caseTag[index].c) {
                            case "==":
                                return this.caseTag[index].case == comparator;
                            case "===":
                                return this.caseTag[index].case === comparator;
                        }
                        let cond = tag.splice
                    }))[0]; //Get the first function that fulfills the condition
                } else {
                    this._switch = () => {}; //If nothing matches then have an empty function
                }

                return this;
            });

        } catch (err) {
            this.catch(err);
        }
    }

    //No
    catch (executor) {
        this._promise.catch(executor);
    }

    then(executor) {
        try {
            //If there is a function from the switch statement
            if (this._switch)
                executor(this._switch());
            else
                executor();
        } catch (err) {
            this.catch(err)
        }
    }
}

(new sPromise((resolve, reject) => {
    let time = setTimeout(() => {
        resolve(3);
    }, 1000);
})).
case(1, () => {
    console.log("WRONG result is ==1");
}).
case(2, () => {
    console.log("WRONG result is ==2");
}).
strictCase('3', () => {
    console.log("WRONG result is ==='3'");
}).
case('3', () => {
    console.log("CORRECT result is =='3'");
}).
switch().
then(res => {
    console.log(res); //Should be null
    console.log("Finished");
}).
catch(err => {
    console.log(err);
})


(new sPromise((resolve, reject) => {
    let time = setTimeout(() => {
        resolve(3);
    }, 1000);
})).
case(1, () => {
    console.log("WRONG result is ==1");
}).
case(2, () => {
    console.log("WRONG result is ==2");
}).
strictCase('3', () => {
    console.log("WRONG result is ==='3'");
}).
case('3', () => {
    console.log("CORRECT result is =='3'");
    return 324;
}).
switch().
then(res => {
    console.log(res); //Should be 324
    console.log("Finished");
}).
catch(err => {
    console.log(err);
})