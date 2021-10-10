import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import {
  Pod,
  PodCreationData,
  PodDeletionData,
  PodDeletionResponse
} from "./util.js";

export class KubeClient {
  protected readonly http: AxiosInstance;

  /**
   * See https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/
   * Creates a kubernetes client with a base url defaulting to localhost:8008.
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
      `/namespaces/${namespace}/pods`
    );

    return response.data.items;
  }

  async createPod(pod: PodCreationData, namespace = "default") {
    if (typeof pod === "undefined")
      throw new Error("Invalid pod creation data.");
    const response = await this.http.post<PodCreationData, AxiosResponse<Pod>>(
      `/namespaces/${namespace}/pods`,
      pod
    );

    return response.data;
  }

  async deletePods(query: PodDeletionData, namespace = "default") {
    if (typeof query === "undefined")
      throw new Error("Invalid pod deletion query.");

    const response = await this.http.delete<PodDeletionResponse>(
      `/namespaces/${namespace}/pods`,
      { params: query }
    );

    return response.data;
  }
}

export const isAxiosError = <T>(err: unknown): err is AxiosError<T> =>
  typeof (err as Record<string, unknown>).response !== "undefined";
