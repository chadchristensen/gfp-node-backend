/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";
let envConfig = {};

if (stage === "production") {
  envConfig = require("./prod");
} else if (stage === "tesing") {
  envConfig = require("./testing");
} else {
  envConfig = require("./local");
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3001,
    db: {
      connection: process.env.DATABASE_URL,
    },
  },
  envConfig,
);
