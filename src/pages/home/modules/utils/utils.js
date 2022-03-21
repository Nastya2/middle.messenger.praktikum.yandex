function last(list) {
    if (!Array.isArray(list)) return undefined;
    
    const length = list.length;
    return length ? list[length - 1] : undefined;
}

function first(list) {
	if (!Array.isArray(list)) return undefined;

    const length = list.length;
    return length ? list[0] : undefined;
}

function range(start = 0, end, step = 1, isRight = false) {
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

  function isEmpty(value) {
    if (!value) {
      return true;
    }
    
    if (Array.isArray(value)) {
      if(!value.length) {
        return true;
      }
    }
    
    if (typeof value === "number") {
      return true;
    }
    
     if (typeof value === "boolean") {
      return true;
    }
    
    if (typeof value === "object" && !Array.isArray(value)) {
      if (value.size === undefined) {
        if (!Object.keys(value).length) {
          return true;
        }
      } else {
        return !!!value.size;
      }
      
    }
    return false;    
  }