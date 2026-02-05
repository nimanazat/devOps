# Calculator + Docker + GitHub Actions

## Overview

This project is a simple web **calculator** wrapped in a complete DevOps flow:

- Static front‑end (HTML, CSS, JS)
- Containerized using **Docker** and **nginx**
- Local orchestration with **docker‑compose**
- CI/CD with **GitHub Actions** (build, test, and push Docker image)

## Project structure

- `index.html` – Page layout and calculator markup.
- `style.css` – Styling for the page, card layout, and buttons.
- `script.js` – Calculator logic and keyboard support.
- `dockerfile` – Builds an nginx-based Docker image serving the calculator.
- `docker-compose.yml` – Convenience wrapper to run the container locally.
- `.dockerignore` – Excludes unnecessary files from Docker build context.
- `.github/workflows/docker-build.yml` – GitHub Actions workflow to build, test, and push the image.

## Run locally (no Docker)

Just open `index.html` in a browser:

1. Clone or download the repo.
2. Double‑click `index.html`.

## Run with Docker

```bash
docker build -t my-calculator .
docker run -d -p 8080:80 --name calc my-calculator
```

Then open `http://localhost:8080` in your browser.

To stop and remove the container:

```bash
docker stop calc
docker rm calc
```

## Run with docker‑compose

```bash
docker compose up --build -d
```

Open `http://localhost:8080`, then:

```bash
docker compose down
```

## GitHub Actions workflow

The workflow in `.github/workflows/docker-build.yml`:

- Runs on every push and pull request to `main`.
- Builds the Docker image.
- Starts the app via `docker compose` and checks `http://localhost:8080` with `curl`.
- Logs in to Docker Hub using repository secrets:
  - `DOCKERHUB_USERNAME`
  - `DOCKERHUB_TOKEN`
- Builds and pushes the image (e.g. `DOCKERHUB_USERNAME/my-calculator:latest`).
- Shuts down containers with `docker compose down`.

## Pushing to Docker Hub (summary)

1. Create a Docker Hub account and access token.
2. In the GitHub repo, add repository secrets:
   - `DOCKERHUB_USERNAME`
   - `DOCKERHUB_TOKEN`
3. Push to `main`. The GitHub Actions workflow will build, test, and push the image automatically.

