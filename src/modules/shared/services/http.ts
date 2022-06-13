enum METHODS {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
};

type stringObj = {[key:string]: string};

interface Options {
  timeout: number;
  method: METHODS;
  data: {[key:string]: any} | undefined;
  headers: {[key:string]: string} | undefined;
}

function queryStringify(data: Options["data"]): string {
  let url = "";

  for(let key in data) {
    const str = `${key}=${data[key].toString()}`;
    url+= `&${str}`;
  }
  url = url.slice(1);
  return "?" + url;
}

class HTTPTransport {
  get = (url: string, options: Options) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  post = (url: string, options: Options) => {	
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  put = (url: string, options: Options) => {	 
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  delete = (url: string, options: Options) => {	 
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = (url: string, options: Options, timeout = 5000) => {
      const {method, headers} = options;
    
      let data: Options["data"];
      if(options.data) {
        data = options.data;
      }

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.timeout = timeout;

        if(method === METHODS.GET) {
          url = url + queryStringify(data);
        }
        xhr.open(method, url);
        
        for(let key in headers) {
          xhr.setRequestHeader(key, headers[key]);
        }
        
        xhr.onload = function() {
          console.log(xhr);
          resolve(xhr);
        };

        xhr.onabort = function() {reject(new Error("abort"))}
        xhr.onerror = function() {reject(new Error("error"))}
        xhr.ontimeout = function() {reject(new Error("timeout"))}

        if (method === METHODS.GET || !data) {
          xhr.send();
        } else {
          xhr.send(JSON.stringify(data));
        }
      });
  };
}