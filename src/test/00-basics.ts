import { expect } from "chai";
import * as http from "http";
import * as https from "https";
import jsC8, { Fabric } from "../jsC8";
import { Connection } from "../connection";

describe("Creating a Fabric", () => {
  describe("using the factory", () => {
    const fabric = jsC8({ c8Version: 54321 });
    it("returns a Fabric instance", () => {
      expect(fabric).to.be.an.instanceof(Fabric);
    });
    it("passes any configs to the connection", () => {
      expect((fabric as any)._connection).to.have.property("_c8Version", 54321);
    });
  });
  describe("using the constructor", () => {
    const fabric = new Fabric({ c8Version: 43210 });
    it("returns a Fabric instance", () => {
      expect(fabric).to.be.an.instanceof(Fabric);
    });
    it("passes any configs to the connection", () => {
      expect((fabric as any)._connection).to.have.property("_c8Version", 43210);
    });
  });
});

describe("Configuring the driver", () => {
  describe.skip("with a string", () => {
    it("sets the url", () => {
      const url = "https://example.com:9000";
      const conn = new Connection(url);
      expect((conn as any)._url).to.eql([url]);
    });
  });
  describe("with headers", () => {
    it("applies the headers", done => {
      const conn = new Connection({
        headers: {
          "x-one": "1",
          "x-two": "2"
        }
      });
      (conn as any)._hosts = [
        ({ headers }: any) => {
          expect(headers).to.have.property("x-one", "1");
          expect(headers).to.have.property("x-two", "2");
          done();
        }
      ];
      conn.request({ headers: {} }, () => { });
    });
  });
  describe("with an c8Version", () => {
    it("sets the x-c8-version header", done => {
      const conn = new Connection({ c8Version: 99999 });
      (conn as any)._hosts = [
        ({ headers }: any) => {
          expect(headers).to.have.property("x-c8-version", "99999");
          done();
        }
      ];
      conn.request({ headers: {} }, () => { });
    });
  });
  describe("with agentOptions", () => {
    const _httpAgent = http.Agent;
    const _httpsAgent = https.Agent;
    let protocol: any;
    let options: any;
    beforeEach(() => {
      protocol = undefined;
      options = undefined;
    });
    before(() => {
      let Agent = (ptcl: any) =>
        function (opts: any) {
          protocol = ptcl;
          options = opts;
          return () => null;
        };
      (http as any).Agent = Agent("http");
      (https as any).Agent = Agent("https");
    });
    after(() => {
      (http as any).Agent = _httpAgent;
      (https as any).Agent = _httpsAgent;
    });
    it("passes the agentOptions to the agent", () => {
      new Connection({ agentOptions: { hello: "world" } }); // eslint-disable-line no-new
      expect(options).to.have.property("hello", "world");
    });
    it("uses the built-in agent for the protocol", () => {
      // default: http
      new Connection(); // eslint-disable-line no-new
      // expect(protocol).to.equal("http");
      new Connection("https://test.macrometa.io"); // eslint-disable-line no-new
      expect(protocol).to.equal("https");
    });
  });
  describe("with agent", () => {
    const _httpRequest = http.request;
    const _httpsRequest = https.request;
    let protocol: any;
    let options: any;
    beforeEach(() => {
      protocol = undefined;
      options = undefined;
    });
    before(() => {
      let Request = (ptcl: any) => (opts: any) => {
        protocol = ptcl;
        options = opts;
        return {
          on() {
            return this;
          },
          end() {
            return this;
          }
        };
      };
      (http as any).request = Request("http");
      (https as any).request = Request("https");
    });
    after(() => {
      (http as any).request = _httpRequest;
      (https as any).request = _httpsRequest;
    });
    it("passes the agent to the request function", () => {
      let agent = Symbol("agent");
      let conn;
      conn = new Connection({ agent }); // default: https
      conn.request({ headers: {} }, () => { });
      expect(options).to.have.property("agent", agent);
      agent = Symbol("agent");
      conn = new Connection({ agent, url: "https://test.macrometa.io" });
      conn.request({ headers: {} }, () => { });
      expect(options).to.have.property("agent", agent);
    });
    it("uses the request function for the protocol", () => {
      const agent = Symbol("agent");
      let conn;
      conn = new Connection({ agent }); // default: http
      conn.request({ headers: {} }, () => { });
      expect(protocol).to.equal("https");
      conn = new Connection({ agent, url: "https://test.macrometa.io" });
      conn.request({ headers: {} }, () => { });
      expect(protocol).to.equal("https");
    });
    it("calls Agent#destroy when the connection is closed", () => {
      const agent = {
        _destroyed: false,
        destroy() {
          this._destroyed = true;
        }
      };
      const conn = new Connection({ agent });
      expect(agent._destroyed).to.equal(false);
      conn.close();
      expect(agent._destroyed).to.equal(true);
    });
  });
});
