export interface EnvVarSource {
  secretKeyRef: {
    key: string;
    name?: string;
    optional?: boolean;
  };
}

export interface EnvVar {
  name: string;
  value?: string;
  valueFrom?: EnvVarSource;
}

export interface Volume {
  name: string;
  nfs?: {
    path: string;
    server: string;
    readOnly?: boolean;
  };
}

export interface PodContainer {
  name: string;
  args?: string[];
  command?: string[];
  env?: EnvVar[];
  image?: string;
  imagePollPolicy?: "Always" | "Never" | "IfNotPresent";
  stdin?: boolean;
  stdinOnce?: boolean;
  tty?: boolean;
  volumes: Volume[];
}

export interface PodStatus {
  hostIP: string;
  phase: "Pending" | "Running" | "Succeded" | "Failed" | "Failed" | "Unknown";
}

export interface PodSpec {
  containers: PodContainer[];
  status: PodStatus;
}

export interface Pod {
  metadata: {
    resourceVersion: string;
    uid: string;
    annotations: Record<string, string>;
    labels: Record<string, string>;
    clusterName: string;
    name: string;
    creationTimestamp: string;
    deletionTimestamp?: string;
  };
  spec: PodSpec;
}

export interface PodCreationData {
  metadata: {
    annotations: Record<string, string>;
    labels: Record<string, string>;
    name: string;
  };

  spec: {
    containers: PodContainer[];
  };
}

export interface PodDeletionData {
  labelSelector?: string;
  fieldSelector?: number;
  limit?: number;
}

export interface PodDeletionResponse {
  code: number;
  details: {
    cause: {
      field: string;
      message: string;
      reason: string;
    }[];
    group: string;
    name: string;
    uid: string;
  };
  message: string;
  reason: string;
  status: string;
}
