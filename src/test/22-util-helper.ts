import { expect } from "chai";
import { getFullStreamPath, getDCListString } from "../util/helper";

describe("Helper.getFullStreamPath", () => {
  it("returns correct output when there is no extra url", () => {
    const path = getFullStreamPath("_polog");
    expect(path).to.equal("/streams/_polog");
  });

  it("returns correct output when there is extra url", () => {
    const path = getFullStreamPath("_polog", "/compaction");
    expect(path).to.equal("/streams/_polog/compaction");
  });
});

describe("Helper.getDCListString", () => {
  const response = [
    {
      _id: "_clusters/dev-ap-southeast-1",
      _key: "dev-ap-southeast-1",
      _rev: "_XqlOdo----",
      host: "54.255.240.116",
      local: false,
      name: "dev-ap-southeast-1",
      port: 30003,
      status: 0,
      tags: {
        city: "Singapore",
        countrycode: "SG",
        countryname: "Singapore",
        latitude: "1.2931",
        longitude: "103.8558",
        role: "c8streams-agent",
        url: "dev-ap-southeast-1.dev.aws.macrometa.io",
      },
    },
    {
      _id: "_clusters/dev-ap-southeast-2",
      _key: "dev-ap-southeast-2",
      _rev: "_XqlOdS---A",
      host: "54.252.208.174",
      local: true,
      name: "dev-ap-southeast-2",
      port: 30003,
      status: 0,
      tags: {
        city: "Sydney",
        countrycode: "AU",
        countryname: "Australia",
        latitude: "-33.8591",
        longitude: "151.2002",
        role: "c8streams-agent",
        url: "dev-ap-southeast-2.dev.aws.macrometa.io",
      },
    },
  ];
  it("returns correct output", () => {
    expect(getDCListString(response)).to.equal(
      "dev-ap-southeast-1,dev-ap-southeast-2"
    );
  });
});
