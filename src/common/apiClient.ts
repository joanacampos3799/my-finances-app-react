import axios from "axios";
import { UUID } from "crypto";

export interface FetchResponse<T> {
  count: number;
  isValueSet: boolean;
  data: T[];
}

export function getHeaders(
  userId: UUID,
  userToken: string
): Record<string, string> {
  return {
    Authorization: userToken,
    "X-User-Id": userId,
  };
}

const axiosInstance = axios.create({
  baseURL: "https://my-finances-app-quarkus-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (userId: UUID, userToken: string) => {
    return await axiosInstance
      .get<FetchResponse<T>>(this.endpoint, {
        headers: getHeaders(userId, userToken),
      })
      .then((res) => res.data);
  };

  get = (id: number | string, userId: UUID, userToken: string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id, {
        headers: getHeaders(userId, userToken),
      })
      .then((res) => res.data);
  };

  getAppUser = (userId: string) => {
    return axiosInstance
      .get<T>(this.endpoint + "?userId=" + userId)
      .then((res) => res.data);
  };

  post = (data: T, userId: UUID, userToken: string) => {
    return axiosInstance
      .post<T>(this.endpoint, data, {
        headers: getHeaders(userId, userToken),
      })
      .then((res) => res.data);
  };

  postQuestion = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  update = (id: number, data: T, userId: UUID, userToken: string) => {
    return axiosInstance
      .put<T>(this.endpoint + "/" + id, data, {
        headers: getHeaders(userId, userToken),
      })
      .then((res) => res.data);
  };

  delete = (id: number, userId: UUID, userToken: string) => {
    return axiosInstance
      .delete<T>(this.endpoint + "/" + id, {
        headers: getHeaders(userId, userToken),
      })
      .then((res) => res.data);
  };

  export = (
    params: { startDate: string; endDate: string; type?: number },
    userId: UUID,
    userToken: string
  ) => {
    return axiosInstance.get<T>(this.endpoint, {
      headers: getHeaders(userId, userToken),
      params: {
        ...params,
      },
      responseType: "blob",
    });
  };

  setActive = (
    id: number,
    active: Boolean,
    userId: UUID,
    userToken: string
  ) => {
    return axiosInstance
      .put<T>(this.endpoint + "/" + id, active, {
        headers: getHeaders(userId, userToken),
      })
      .then((res) => res.data);
  };
}

export default APIClient;
