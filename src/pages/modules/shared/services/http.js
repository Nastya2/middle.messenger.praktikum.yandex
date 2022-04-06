const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};
  
  function queryStringify(data) {
      let url = "";
  
      for(let key in data) {
          const str = `${key}=${data[key].toString()}`;
          url+= `&${str}`;
      }
      url = url.slice(1);
    return "?" + url;
  }
  
  class HTTPTransport {
          get = (url, options = {}) => {
            if(options.data) {
                options.data =  queryStringify(options.data);
              }
   
              return this.request(url, {...options, method: METHODS.GET}, options.timeout);
          };
    
        post = (url, options = {}) => {	
          return this.request(url, {...options, method: METHODS.POST}, options.timeout);
        };
    
        put = (url, options = {}) => {	 
           return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
        };
    
        delete = (url, options = {}) => {	 
          return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
        };
  
  
          // PUT, POST, DELETE
  
          // options:
          // headers — obj
          // data — obj
          request = (url, options, timeout = 5000) => {
            console.log(url, options, timeout);
              const {method, headers} = options;
            
              let data;
              if(options.data) {
                data = options.data;
              }
   
              return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.timeout = timeout;
                xhr.open(method, url);
                
                for(let key in headers) {
                  xhr.setRequestHeader(key, headers[key]);
                }
                
                xhr.onload = function() {
                  console.log(xhr);
                  resolve(xhr);
                };
  
                xhr.onabort = function() {reject(new Error("1"))}
                xhr.onerror = function() {reject(new Error("2"))}
                xhr.ontimeout = function() {reject(new Error("3"))}
  
                if (method === METHODS.GET || !data) {
                  console.log("send");
                  xhr.send();
                } else {
                  console.log("send2", data);
                  xhr.send(JSON.stringify(data));
                }
              });
          };
  }

  const a = new HTTPTransport().get("/", {data: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}});
  console.log(a);

 