import Router from "./router";
import { expect } from "chai";
import { BlockMock1, BlockMock2, getContentFake1, getContentFake2 } from "./mock.test";

describe('Router', () => {

    beforeEach(() => {
        Router.reset();
    });

    describe("use()", () => {
        it("should return Router instanse", () => {
            const res = Router.use("/login", BlockMock1, {});

            expect(res).to.eq(Router);
        });
    });

    describe("render a page on start", () => {
        it('should render a page on start', () => {
            Router
            .use('/', BlockMock1, {})
            .start();

            expect(getContentFake1.callCount).to.eq(1);
        });
    });

    describe('back()', () => {
        it('should render a page on history back action', () => {
          Router
            .use('/', BlockMock2, {})
            .start();
    
          Router.back();
          expect(getContentFake2.callCount).to.eq(2);
        });
    });

});