export function isEmpty(value) {
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