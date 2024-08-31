import axios, { AxiosRequestConfig } from 'axios';

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/'
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig) => {
    return await axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string, config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id, config)
      .then((res) => res.data);
  };

  getAppUserId = (userId: string) => {
    return axiosInstance
      .get<T>(this.endpoint + '?userId=' + userId)
      .then((res) => {
        console.log(res)
       return res.data
      });
  };

  post = (data: T, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post<T>(this.endpoint, data, config)
      .then(res => res.data);
  }
}

export default APIClient;