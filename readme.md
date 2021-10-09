# @flowtr/kube

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Linting By ESLint](https://raw.githubusercontent.com/aleen42/badges/master/src/eslint.svg)](https://eslint.org)
[![Typescript](https://raw.githubusercontent.com/aleen42/badges/master/src/typescript.svg)](https://typescriptlang.org)

A tiny kubernetes client written with typescript. **Only compatible with ES Modules** and not CommonJS.

## Usage

A better documentation site is coming soon, however basic usage is provided below.

### Creating a client

```typescript
import { KubeClient } from "@flowtr/kube/client.js";

// run "kubectl proxy --port=8008" so that it works without authentication
// as auth isn't currently implemented
const client = new KubeClient("http://localhost:8008/api/v1");
```

### Retrieving a list of pods

```typescript
// get all pods in the default namespace
const pods = await client.getPods("default");

console.log(pods[0]);
```

