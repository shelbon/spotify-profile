import proxy from 'fastify-http-Proxy';
import axios from 'axios';
import querystring from 'querystring';
import { generateRandomString } from '../utils.js';

export default async function (fastify, opts) {
  let state;
  let access_token;
  let refresh_token;
  fastify.register(proxy, {
    upstream: 'https://api.spotify.com/v1/me/top/artists',
    prefix: '/top/artists/', // optional
    undici: true,
    http2: false, // optional
    httpMethods: ['GET'],
    preHandler: function (request, reply, done) {
      console.table({ access_token: request.session.get('access_token') });
      access_token = request.session.get('access_token');
      done();
    },
    replyOptions: {
      rewriteRequestHeaders: (originalRequest, headers) => {
        console.table({ access_token: access_token });
        return {
          /**
           * Preserve the existing request headers.
           */
          ...headers,
          /**
           * Add the header which the API we're proxying requests
           * to requires to authenticate the request.
           */
          Authorization: `Bearer ${access_token || ''}`,
        };
      },
    },
  });
  fastify.register(proxy, {
    upstream: 'https://accounts.spotify.com/authorize',
    prefix: '/spotify/login/', // optional
    undici: true,
    http2: false, // optional
    preHandler: function (req, res, done) {
      //set state
      state = generateRandomString(16);
      console.table({
        request: req.headers,
      });

      res.setCookie(this.config.STATE_KEY, state, {
        secure: this.config.NODE_ENV === 'production',
        httpOnly: true,
        // The cookie should be sent only to this domain
        path: '/spotify/login/',
      });

      done();
    },
    replyOptions: {
      rewriteHeaders: (headers) => {
        //Add state to headers location
        console.table({ header: headers });
        headers.location = headers.location += `%26state%3D${state}`;
        return {
          ...headers,
        };
      },
      rewriteRequestHeaders: (originalRequest, headers) => {
        console.table({ originalRequest: originalRequest.headers });
        return {
          ...headers,
        };
      },
      queryString: {
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: process.env.SCOPE,
        redirect_uri: process.env.REDIRECT_URI,
      },
    },
  });
  // Ask the api the access_token and refresh_token
  fastify.get('/spotify/login/callback/', function (req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    let code = req.query.code || null;
    let state = req.query.state || null;
    let storedState = req.cookies ? req.cookies[this.config.STATE_KEY] : null;
    console.table({ state: state, storedState: storedState });
    if (state === null || state !== storedState) {
      res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
    } else {
      res.clearCookie(this.config.STATE_KEY);
      // your application requests authorization
      const params = {
        client_id: this.config.CLIENT_ID,
        client_secret: this.config.CLIENT_SECRET,
        redirect_uri: this.config.REDIRECT_URI,
        code,
        grant_type: 'authorization_code',
      };

      axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => {
          let access_token = response.data.access_token;
          let referrer=req.headers.referer;
          req.session.set('access_token', response.data.access_token);
          console.table({ access_token: req.session.get('access_token') });
          refresh_token = response.data.refresh_token;

          axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: { Authorization: 'Bearer ' + access_token },
          })
            .then(() => {
               
              res
                .setCookie('isLogin', true, {
                  sameSite: true,
                  path: '/',
                })
                .redirect(referrer);
            })
            .catch((e) => {
              res.redirect(
                '/#' + querystring.stringify({ error: e.response.data })
              );
            });
        })
        .catch((e) => {
          res.unauthorized();
        });
    }
  });
}
