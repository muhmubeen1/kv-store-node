# High-Performance In-Memory Key-Value Store (Redis Clone) & K8s Pipeline

A custom, low-level in-memory data store engine built from scratch using Node.js raw TCP sockets, featuring custom RESP protocol parsing, OCI containerization, automated Azure DevOps CI/CD pipelines, and Kubernetes Helm orchestration.

## 🚀 Key Features

* **Low-Level Socket Server:** Uses native Node.js `net` TCP sockets (Layer 4) for minimal network overhead.
* **RESP Protocol Parser:** Custom implementation of the REdis Serialization Protocol supporting array framing and bulk string responses.
* **Core Command Engine:** Native support for `PING`, `SET`, `GET`, and `DEL` operations backed by an in-memory `Map` data structure.
* **Multi-Stage Containerization:** Lightweight, non-root Alpine-based OCI image for production environments.
* **Automated CI/CD:** Azure DevOps Pipeline performing static code validation, dependency checks, and automated container builds on every push to `main`.
* **Kubernetes Ready:** Includes custom Helm charts for deployment, resource-limited pod management, and cluster networking (`ClusterIP`).

---

## 🛠️ Tech Stack

* **Language/Runtime:** Node.js (ES6+, Raw TCP Sockets)
* **Containers:** Docker (Multi-stage builds)
* **CI/CD:** Azure DevOps Pipelines
* **Orchestration:** Kubernetes, Helm (v3)

---

## 💻 Quick Start (Local Docker)

### 1. Build & Run
```bash
docker build -t redis-node-clone:v1 .
docker run -d -p 6380:6379 --name redis-server redis-node-clone:v1