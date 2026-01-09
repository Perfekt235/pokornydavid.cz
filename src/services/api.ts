import { ApiClient } from "./ApiClient";

export const api = new ApiClient(
  process.env.NEXT_PUBLIC_CLIENT_SERVER_URL!
);
