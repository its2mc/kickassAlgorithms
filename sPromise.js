class sPromise extends Promise {

    constructor(executor) {
        super((resolve, reject) => {
            return executor(resolve, reject);
        })

        this._caseTag = [];
        this._caseFunc = [];
        this.onRejected = () => {};
        this._switch = () => {};

    }

    case (_case, _cb) {
        if (!!_case || _case === 0) {
            this._caseTag.push({ c: "==", case: _case });
            this._caseFunc.push(_cb);
        }
        return this;
    }

    strictCase(_case, _cb) {
        if (!!_case || _case === 0) {
            this._caseTag.push({ c: "===", case: _case });
            this._caseFunc.push(_cb);
        }
        return this;
    }

    //This function executes the case conditions
    switch (onFulfilled, onRejected) {
        let scope = this;
        this.then(comparator => {
            try {
                let _switch = () => {};

                if (scope._caseTag.length !== 0) {
                    _switch = (scope._caseFunc.filter((tag, index) => {
                        switch (scope._caseTag[index].c) {
                            case "==":
                                return scope._caseTag[index].case == comparator;
                            case "===":
                                return scope._caseTag[index].case === comparator;
                        }
                    }))[0] || (() => {}); //Get the first function that fulfills the condition

                }
                onFulfilled(_switch());

            } catch (err) {
                if (onRejected) onRejected(err);
                else {
                    scope.onRejected(err);
                };
            }
        });

        return this;
    } catch (onRejected) {
        this.onRejected = onRejected
        return this;
    }

};



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
switch(res => {
    console.log(res); //Should be null
    console.log("Finished");
}).
catch(err => {
    console.log(err);
});


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
switch(res => {
    console.log(res); //Should be 324
    console.log("Finished");
}).
catch(err => {
    console.log(err);
});