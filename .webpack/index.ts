/* eslint-disable @typescript-eslint/no-explicit-any */
import { merge } from "webpack-merge";
import common from "./webpack.common";
import development from "./webpack.dev";
import production from "./webpack.prod";
import { type ENV } from "./typescript";
import { config } from "dotenv"; /** @Use process.env.XXX  */

export default (env: ENV) => {
  switch (true) {
    case env.development: {
      config({ path: ".env.development" });
      return merge(common(env), development as any);
    }

    case env.production: {
      config({ path: ".env.production" });
      return merge(common(env), production as any);
    }

    default:
      return new Error("无该配置项文件!");
  }
};
