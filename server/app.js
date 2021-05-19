'use strict';

import { join } from 'desm';
import AutoLoad from 'fastify-autoload';
import Csrf from 'fastify-csrf';
import Cors from 'fastify-cors';
import Env from 'fastify-env';
import Static from 'fastify-static';
import Session from 'fastify-session';
import Cookie from 'fastify-cookie';
export default async function (fastify, opts) {
  // Place here your custom code!
  const envOption = {
    dotenv: {
      path: `${import.meta.url}/.env`,
      debug: true,
    },
    schema: {
      type: 'object',
      required: [
        'PORT',
        'REDIRECT_URI',
        'CLIENT_SECRET',
        'CLIENT_ID',
        'SESSION_SECRET',
        'SCOPE',
        'STATE_KEY',
      ],
      properties: {
        PORT: {
          type: 'string',
          default: 8888,
        },
        REDIRECT_URI: {
          type: 'string',
        },
        CLIENT_ID: {
          type: 'string',
        },
        CLIENT_SECRET: {
          type: 'string',
        },
        SESSION_SECRET: {
          type: 'string',
        },
        SCOPE: {
          type: 'string',
        },
        STATE_KEY: {
          type: 'string',
        },
      },
    },
  };
  fastify.register(Env, envOption);
  fastify.register(Cookie);
  fastify.register(Cors, {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5000'],
  });
  fastify.register(Csrf, {
    sessionPlugin: 'fastify-cookie',
    cookieOpts: { signed: true },
  });
  fastify.register(Session, {
    // adapt this to point to the directory where secret-key is located
    secret: 'averylogphrasebiggerthanthirtytwochars',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 604800, // one week in seconds,
      sameSite: true,
      expires: new Date(Date.now() + 604800 * 1000),
    },
  });
  fastify.register(Static, {
    root: join(import.meta.url, 'public'),
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'routes'),
    options: Object.assign({}, opts),
  });

  fastify.ready(function () {
    // or fastify[options.confKey]
    console.log(fastify.config);
  });
}
