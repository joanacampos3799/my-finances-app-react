import axios, { AxiosRequestConfig } from 'axios';
import { useUserStore } from './stores/userStore';

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const {userId} = useUserStore()

const axiosInstance = axios.create({
  baseURL: 'https://localhost:8080/',
  headers: {'X-User-ID': userId}
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

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + '/' + id)
      .then((res) => res.data);
  };
}

export default APIClient;