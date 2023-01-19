import { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import HTTPTransport from './http';
import { expect } from 'chai';
import { BASE_URL } from "../../../shared/consts";
const sinon = require("sinon");

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('get() should send get request', () => {

    HTTPTransport.get(`${BASE_URL}/chats`, {})

    expect(requests[0].method).to.eq('get');
  });

  it('post() should send post request', () => {

    HTTPTransport.post(`${BASE_URL}/chats`, {})

    expect(requests[0].method).to.eq('post');
  });

  it('put() should send put request', () => {

    HTTPTransport.put(`${BASE_URL}/chats`, {})

    expect(requests[0].method).to.eq('put');
  });

  it('delete() should send delete request', () => {

    HTTPTransport.delete(`${BASE_URL}/chats`, {})

    expect(requests[0].method).to.eq('delete');
  });
});