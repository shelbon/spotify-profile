
/**
 * @roxi/routify 2.18.0
 * File generated Tue Jul 13 2021 10:32:43 GMT-0400 (Amazon Standard Time)
 */

export const __version = "2.18.0"
export const __timestamp = "2021-07-13T14:32:43.105Z"

//buildRoutes
import { buildClientTree } from "@roxi/routify/runtime/buildRoutes"

//imports


//options
export const options = {}

//tree
export const _tree = {
  "name": "_layout",
  "filepath": "/_layout.svelte",
  "root": true,
  "ownMeta": {},
  "absolutePath": "C:/Users/shero/Documents/Project/web/spotify-profile/src/pages/_layout.svelte",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "_fallback.svelte",
      "filepath": "/_fallback.svelte",
      "name": "_fallback",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/shero/Documents/Project/web/spotify-profile/src/pages/_fallback.svelte",
      "importPath": "../src/pages/_fallback.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": true,
      "isPage": false,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/_fallback",
      "id": "__fallback",
      "component": () => import('../src/pages/_fallback.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/shero/Documents/Project/web/spotify-profile/src/pages/index.svelte",
      "importPath": "../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('../src/pages/index.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "login.svelte",
      "filepath": "/login.svelte",
      "name": "login",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/shero/Documents/Project/web/spotify-profile/src/pages/login.svelte",
      "importPath": "../src/pages/login.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {
        "name": "login",
        "reset": true
      },
      "meta": {
        "name": "login",
        "reset": true,
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/login",
      "id": "_login",
      "component": () => import('../src/pages/login.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "playlist.svelte",
      "filepath": "/playlist.svelte",
      "name": "playlist",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/shero/Documents/Project/web/spotify-profile/src/pages/playlist.svelte",
      "importPath": "../src/pages/playlist.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/playlist",
      "id": "_playlist",
      "component": () => import('../src/pages/playlist.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "top-artists.svelte",
      "filepath": "/top-artists.svelte",
      "name": "top-artists",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/shero/Documents/Project/web/spotify-profile/src/pages/top-artists.svelte",
      "importPath": "../src/pages/top-artists.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/top-artists",
      "id": "_topArtists",
      "component": () => import('../src/pages/top-artists.svelte').then(m => m.default)
    },
    {
      "isFile": true,
      "isDir": false,
      "file": "tracks.svelte",
      "filepath": "/tracks.svelte",
      "name": "tracks",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "C:/Users/shero/Documents/Project/web/spotify-profile/src/pages/tracks.svelte",
      "importPath": "../src/pages/tracks.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": false,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "recursive": true,
        "preload": false,
        "prerender": true
      },
      "path": "/tracks",
      "id": "_tracks",
      "component": () => import('../src/pages/tracks.svelte').then(m => m.default)
    }
  ],
  "isLayout": true,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "isPage": false,
  "isFile": true,
  "file": "_layout.svelte",
  "ext": "svelte",
  "badExt": false,
  "importPath": "../src/pages/_layout.svelte",
  "meta": {
    "recursive": true,
    "preload": false,
    "prerender": true
  },
  "path": "/",
  "id": "__layout",
  "component": () => import('../src/pages/_layout.svelte').then(m => m.default)
}


export const {tree, routes} = buildClientTree(_tree)

