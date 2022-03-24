export function range(start = 0, end, step = 1, isRight = false) {
    let arr = [];
    if(end === undefined) {
      end = start;
      start = 0;
    }
    step = step === undefined ? (start < end ? 1 : -1) : step;
    
    if(end > 0 ) {
        for(let i = start; i < end; i = i+step) {
          arr.push(i);
        }
    }

    if(end < 0 ) {
        for(let i = start; i > end; i = i-step) {
            arr.push(i);
        }
    }
    
    return isRight ? arr.reverse() : arr;
         
}