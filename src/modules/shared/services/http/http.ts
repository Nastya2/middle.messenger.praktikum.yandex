enum METHODS {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}


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

export class HTTPTransport {
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

  private request = (url: string, options: Options, method: METHODS,timeout = 5000): Promise<any> => {
      const headers = options.headers || {};
    
      let data: Options["data"];
      if(options.data) {
        data = options.data;
      }

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.timeout = timeout;

        if(method === METHODS.GET && data) {
          url = url + queryStringify(data);
        } else {
          headers["content-type"] = 'application/json'
        }

        xhr.open(method, url);
        
        for(const key in headers) {
          xhr.setRequestHeader(key, headers[key]);
        }
        
        xhr.onload = function() {
          if (xhr.status === 200) {
            console.log(xhr, "1");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log(xhr.status, JSON.parse(xhr.response).reason);
            //resolve(xhr);
          }
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