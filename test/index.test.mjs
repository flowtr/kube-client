import { expect } from "chai";
import { describe } from "mocha";
import { KubeClient } from "../dist/client.js";

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
});
