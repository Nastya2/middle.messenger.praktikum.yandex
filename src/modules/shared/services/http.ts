enum METHODS {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

type stringObj =  Record<string, string>;

interface Options {
  timeout?: number;
  data?: Record<string, any>;
  headers?: Record<string, string>;
}

function queryStringify(data: Options["data"]): string {
  let url = "";

  for(const key in data) {
    const str = `${key}=${data[key].toString()}`;
    url+= `&${str}`;
  }
  url = url.slice(1);
  return "?" + url;
}

class HTTPTransport {
  public get = (url: string, options: Options) => {
    return this.request(url, {...options }, METHODS.GET, options.timeout);
  };

  public post = (url: string, options: Options) => {	
    return this.request(url, {...options }, METHODS.POST, options.timeout);
  };

  public put = (url: string, options: Options) => {	 
    return this.request(url, {...options }, METHODS.PUT, options.timeout);
  };

  public delete = (url: string, options: Options) => {	 
    return this.request(url, {...options }, METHODS.DELETE, options.timeout);
  };

  private request = (url: string, options: Options, method: METHODS,timeout = 5000) => {
      const headers = options.headers;
    
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
        
        for(const key in headers) {
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