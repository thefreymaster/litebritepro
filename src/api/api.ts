import axios from "axios";

const version = "/v1";

export const createSession = async () =>
  axios.post(`${version}/session/create`);

const api = {
  create: {
    session: createSession,
  },
};

export default api;
