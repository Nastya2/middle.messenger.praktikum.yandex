import { Indexed } from "@types";
import { merge } from "./merge";

export function set(object: Indexed | any, path: string, value: unknown): Indexed | unknown {
  if(typeof path !== "string") {
    throw new Error('path must be string');
  }
  
  if(object.constructor !== Object) {
    return object;
  }
  
  const mergeObj: any = path.split(".").reduceRight((acc: any, currentValue) => {
    return { [currentValue]: acc }
  },value);

  return merge(object, mergeObj);
}