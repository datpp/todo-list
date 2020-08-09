import { HttpClient } from "./HttpClient";
import getConfig from "next/config";

export abstract class BaseService {
  protected httpClient: HttpClient;

  constructor(baseEndpoint: string) {
    const { publicRuntimeConfig } = getConfig();

    const baseUrl = publicRuntimeConfig.apiEndpoint + baseEndpoint;

    this.httpClient = new HttpClient(baseUrl);
  }
}
