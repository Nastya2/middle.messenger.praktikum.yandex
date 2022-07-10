function isEqual(lhs: any, rhs:  any) {
    let res = true;
    outer:for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        if(!lhs.hasOwnProperty(p)) {
            res = false;
            break outer;
        }

        if (rhs[p].constructor === Object) {
            rhs[p] = isEqual(lhs[p], rhs[p]);
        } else {
            console.log(lhs[p], rhs[p]);
            if (lhs[p] !== rhs[p]) {
                res = false;
                break outer;
            }
        }
    }

    return res;

}