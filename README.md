# Spotify profile App

A web app for vizualizing personalized data from spotify.

[![svelte](https://img.shields.io/badge/svelte-3.38.2-61dafb)](https://svelte.dev/)
[![Fastify](https://img.shields.io/badge/fastify-3.15.1-61dafb)](https://www.fastify.io/)

A Fully responsive web app
Build with:

- [svelte](https://svelte.dev/)
- [fastify](https://www.fastify.io/)
- spotify api
- routing with [routify](https://routify.dev/)

## Features

- Your most favorite artists of all time.
- your most listened tracks
- What constitutes your favorite songs (is it danceable, happy/sad and more).
- Popularity score of artists all over the world.

## Installation

### Prerequisites

- Have a spotify account.
- register the application in the [dashboard](https://developer.spotify.com/dashboard),tutorial is [there](https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app).

After cloning the project you need to run `npm install`.

Create a .env file in client and server folder.

The environment variables it should have:

client folder:
-VITE_API_BASE_URL

server folder :

- CLIENT_ID
- CLIENT_SECRET
- REDIRECT_URI
- SCOPE
- STATE_KEY
- PORT
- SESSION_SECRET
