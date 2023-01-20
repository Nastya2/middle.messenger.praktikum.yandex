import { Link } from './link';
import { expect } from 'chai';
const sinon = require("sinon");

describe('Link', () => {
  it('should render', () => {
    new Link({});
  });

  it('element should return div', () => {
    const link = new Link({});
    const element = link.getContent();

    expect(element).to.be.instanceof(window.HTMLDivElement);
  });

  it('should call func for click', () => {
    const link = new Link({});
    const func = sinon.fake();
    const element = link.getContent() as HTMLDivElement;

    element.onclick = func;
    element.click();

    expect(func.calledOnce).to.eq(true);
  });
});

