import { expect } from "chai";
import { describe } from "mocha";
import { KubeClient, isAxiosError } from "../dist/client.js";

describe("Kubernetes client", async () => {
  const client = new KubeClient("http://localhost:8008/api/v1");

  it("List pods", async () => {
    // get all pods in the default namespace
    const pods = await client.getPods("default");

    const filteredPods = pods.filter(
      (p) => p && p.metadata.labels["com.theoparis.app"] === "kube-test"
    );

    expect(filteredPods.length).to.deep.equal(0);
  });

  it("Create a pod", async () => {
    try {
      const response = await client.createPod({
        metadata: {
          labels: {
            "com.theoparis.app": "kube-test"
          },
          annotations: {},
          name: "hello-world"
        },
        spec: {
          containers: [
            {
              args: [],
              command: [],
              env: [],
              image: "docker.io/hello-world",
              name: "hello-world",
              volumes: [],
              imagePollPolicy: "IfNotPresent"
            }
          ]
        }
      });

      expect(response.metadata.labels["com.theoparis.app"]).to.deep.equal(
        "kube-test"
      );
    } catch (err) {
      if (isAxiosError(err)) console.error(err.response.data);

      throw err;
    }
  });

  it("Delete a pod", async () => {
    const response = await client.deletePods({
      labelSelector: "com.theoparis.app=kube-test"
    });

    expect(response).to.exist;
  });
});
