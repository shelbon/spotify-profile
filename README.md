# Spotify profile App

A web app for vizualizing personalized data from spotify. [live version](https://spotifile.netlify.app)

[![svelte](https://img.shields.io/badge/svelte-3.42.1-61dafb)](https://svelte.dev/)
[![routify](https://img.shields.io/badge/routify-2.18.3-61dafb)](https://routify.dev)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b13a6f77-4767-445d-a7ba-5ea0e5c1dd64/deploy-status)](https://app.netlify.com/sites/spotifile/deploys)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev//shelbon/spotify-profile)

A Fully responsive web app
Build with:

- [Svelte](https://svelte.dev/)
- Routing with [routify](https://routify.dev/)
- Use a [fastify proxy server](https://github.com/shelbon/reverse-proxy-spotify-profile) for masking api credentials to the user's web browser.

## Features

- Your most favorite artists of all time.
- Your most listened tracks
- What constitutes your favorite songs (is it danceable, happy/sad and more).
- Your playlist

## Launch

### Prerequisites

- Have a spotify account,heroku account.
- Register the application in the [dashboard](https://developer.spotify.com/dashboard),tutorial is [there](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app).
- Download the [proxy server github project](https://github.com/shelbon/reverse-proxy-spotify-profile).
- After cloning the project you need to run `npm install`.

Create a .env file in root directory.

The environment variables must have :

VITE_API_BASE_URL= base url of the heroku server/

## Locally

Launch dev server

```shell
npm run dev
```

or test production code.

```shell
npm run build && npm run serve
```

## On Netlify

<a alt="deploy to  netlify" href="https://app.netlify.com/start/deploy?repository=https://github.com/shelbon/spotify-profile#NODE_VERSION=16.4.1&NPM_VERSION=7.19.1"><img src="https://www.netlify.com/img/deploy/button.svg"/></a>
