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

interface IRequest {
  (a:string, b: Options): Promise<any>
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
  public get: IRequest = (url, options) => {
    return this.request(url, {...options }, METHODS.GET, options.timeout);
  };

  public post: IRequest = (url, options) => {	
    return this.request(url, {...options }, METHODS.POST, options.timeout);
  };

  public put: IRequest = (url, options) => {	 
    return this.request(url, {...options }, METHODS.PUT, options.timeout);
  };

  public delete: IRequest = (url, options) => {	 
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
        } else if (!(data instanceof FormData)) {
          headers["content-type"] = 'application/json'
        }

        xhr.open(method, url);
        
        for(const key in headers) {
          xhr.setRequestHeader(key, headers[key]);
        }
        
        xhr.onload = function() {
          if (xhr.status === 200)  {
            if(xhr.response === "OK" || xhr.getResponseHeader("content-type") === "image/jpeg") {
              resolve(xhr.response);
            } else {
              resolve(JSON.parse(xhr.response));
            }
          } else {
            if(xhr.status === 400 || xhr.status === 401) {
              reject(JSON.parse(xhr.response).reason);
            }
          }
        };

        xhr.onabort = function() {reject(new Error("abort"))}
        xhr.onerror = function() {reject(new Error("error"))}
        xhr.ontimeout = function() {reject(new Error("timeout"))}

        if (method === METHODS.GET || !data) {
          xhr.send();
        } else if(data instanceof FormData) {
          xhr.send(data);
        } else {
          xhr.send(JSON.stringify(data));
        }
      });
  };
}

export default new HTTPTransport();