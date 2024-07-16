/** @Typescript typescript ts-node @types/node @types/webpack (https://webpack.docschina.org/configuration/configuration-languages/#typescript) */
import webpack from "./.webpack/index";
import { type ENV } from "./.webpack/typescript";

export default (env: ENV) => webpack(env);
