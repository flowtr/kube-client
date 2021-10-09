import axios, { AxiosInstance } from "axios";
import { Pod } from "./util";

export class KubeClient {
  protected readonly http: AxiosInstance;

  /**
   * https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/
   */
  constructor(public readonly baseUrl = "http://localhost:8008/api/v1") {
    this.http = axios.create({
      baseURL: baseUrl
    });
  }

  /**
   * Get a list of kubernetes pods on a namespace.
   * @param namespace If not specified, the namespace is set to "default".
   */
  async getPods(namespace = "default") {
    const response = await this.http.get<{ items: Pod[] }>(
      `${this.baseUrl}/namespaces/${namespace}/pods`
    );

    return response.data.items;
  }
}
