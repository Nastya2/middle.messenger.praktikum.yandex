const sinon = require("sinon");

const getContentFake1 = sinon.fake.returns(document.createElement('div'));
class BlockMock1  {
    getContent = getContentFake1;
    dispatchComponentDidMount() { return true; }
}
const getContentFake2 = sinon.fake.returns(document.createElement('div'));
class BlockMock2  {
    getContent = getContentFake2;
    dispatchComponentDidMount() {  return true; }
}

global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
    }
};

export {BlockMock1, BlockMock2, getContentFake1, getContentFake2};
