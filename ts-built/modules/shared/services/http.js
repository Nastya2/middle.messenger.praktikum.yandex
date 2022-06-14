var METHODS;
(function (METHODS) {
    METHODS["GET"] = "get";
    METHODS["POST"] = "post";
    METHODS["PUT"] = "put";
    METHODS["DELETE"] = "delete";
})(METHODS || (METHODS = {}));
;
function queryStringify(data) {
    let url = "";
    for (let key in data) {
        const str = `${key}=${data[key].toString()}`;
        url += `&${str}`;
    }
    url = url.slice(1);
    return "?" + url;
}
class HTTPTransport {
    constructor() {
        this.get = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }), options.timeout);
        };
        this.post = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.POST }), options.timeout);
        };
        this.put = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }), options.timeout);
        };
        this.delete = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.DELETE }), options.timeout);
        };
        this.request = (url, options, timeout = 5000) => {
            const { method, headers } = options;
            let data;
            if (options.data) {
                data = options.data;
            }
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.timeout = timeout;
                if (method === METHODS.GET) {
                    url = url + queryStringify(data);
                }
                xhr.open(method, url);
                for (let key in headers) {
                    xhr.setRequestHeader(key, headers[key]);
                }
                xhr.onload = function () {
                    console.log(xhr);
                    resolve(xhr);
                };
                xhr.onabort = function () { reject(new Error("abort")); };
                xhr.onerror = function () { reject(new Error("error")); };
                xhr.ontimeout = function () { reject(new Error("timeout")); };
                if (method === METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(JSON.stringify(data));
                }
            });
        };
    }
}
//# sourceMappingURL=http.js.map