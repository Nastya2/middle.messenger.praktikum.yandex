const METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

function queryStringify(data) {
  let url = '';

  for (let key in data) {
    const str = `${key}=${data[key].toString()}`;
    url += `&${str}`;
  }
  url = url.slice(1);
  return '?' + url;
}

function fetchWithRetry(url, options) {
  console.log(options, "opt")
  const {retries = 1} = options;

  function onError(err) {
    const triesLeft = retries - 1;
    console.log(triesLeft, retries);
    if (!triesLeft){
      throw err;
    }
    return fetchWithRetry(url, {...options, retries: triesLeft});
  }

    const fetch = new Promise((resolve, reject) => {
      console.log('into');
      const { method, headers, timeout } = options;
      let data;
      if (options.data) {
        data = options.data;
      }
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
        console.log('resolve', xhr.response);
        resolve(xhr.response);
        return xhr.response;
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });

    return fetch.catch(onError);
}

fetchWithRetry("/", {retries: 3, method: "GET"}).then((res)=> console.log("ok", res), (err)=> console.log(err, "no ok"));
  