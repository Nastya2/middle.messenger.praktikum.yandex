export function isEmpty(value: unknown) {
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

    if (value instanceof Map || value instanceof Set) {
      return !!!value.size;
    }
    
    if (typeof value === "object" && !Array.isArray(value)) {
      if (!Object.keys(value).length) {
        return true;
      }
    }
  
    return false;    
  }