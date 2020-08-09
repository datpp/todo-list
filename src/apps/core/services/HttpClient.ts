import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { from } from "rxjs";

export class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }

  request(config: AxiosRequestConfig) {
    return from(this.instance.request(config));
  }

  get(url: string, config?: AxiosRequestConfig) {
    return from(this.instance.get(url, config));
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return from(this.instance.delete(url, config));
  }

  head(url: string, config?: AxiosRequestConfig) {
    return from(this.instance.head(url, config));
  }

  options(url: string, config?: AxiosRequestConfig) {
    return from(this.instance.options(url, config));
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return from(this.instance.post(url, data, config));
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return from(this.instance.put(url, data, config));
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return from(this.instance.patch(url, data, config));
  }
}
