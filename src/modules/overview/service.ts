import { request, type Response } from "@request";

export const getYiyan = (): Response<{
  author: string;
}> => {
  return request.get("/oioweb/api/common/yiyan");
};
