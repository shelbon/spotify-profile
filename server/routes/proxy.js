import proxy from 'fastify-http-Proxy';
import axios from 'axios';
import querystring from 'querystring';
import { generateRandomString, isTimeToRefreshToken } from '../utils.js';
import { DateTime } from 'luxon';
export default async function (fastify, opts) {
  let state;
  let access_token;
  let refresh_token;
  let access_token_expires_in;
  let lastRequestAccessToken;
  const refreshToken = (refresh_token) => {
    const params = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
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
        access_token = response.data.access_token;
      })
      .catch((e) => {
        console.error(e.response.data);
      });
  };
  fastify.addHook('preHandler', (req, res, next) => {
    let expires_in = access_token_expires_in * 1000;
    if(lastRequestAccessToken!==undefined){
      console.table({
      expires_in: expires_in,
      currentDate: DateTime.now().toObject(),
      lastFetch: lastRequestAccessToken.toObject(),
    });
    }
    
    let shouldIRefresh = isTimeToRefreshToken(
      expires_in,
      DateTime.now(),
      lastRequestAccessToken
    );
    console.table({ shouldIRefresh: shouldIRefresh });
    if (shouldIRefresh) {
      console.log('refreshing token');
      refreshToken(refresh_token);
    }

    next();
  });
  fastify.register(proxy, {
    upstream: 'https://api.spotify.com/v1/me/top/artists',
    prefix: '/top/artists/', // optional
    undici: false,
    http2: false, // optional
    httpMethods: ['GET'],
    replyOptions: {
      rewriteRequestHeaders: (originalRequest, headers) => {
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
    upstream: 'https://api.spotify.com/v1/me/playlists',
    prefix: '/playlists', // optional
    undici: true,
    http2: false, // optional
    httpMethods: ['GET'],
    replyOptions: {
      rewriteRequestHeaders: (originalRequest, headers) => {
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
    upstream: 'https://api.spotify.com/v1/me',
    prefix: '/user', // optional
    undici: true,
    http2: false, // optional
    httpMethods: ['GET'],
    replyOptions: {
      rewriteRequestHeaders: (originalRequest, headers) => {
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
    upstream: 'https://api.spotify.com/v1/me/following',
    prefix: '/user/following', // optional
    undici: true,
    http2: false, // optional
    httpMethods: ['GET'],
    replyOptions: {
      rewriteRequestHeaders: (originalRequest, headers) => {
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
      queryString: {
        type: 'artist',
        limit: 50,
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
        let position = headers.location.indexOf(
          `%26client_id%3D${process.env.client_id}`
        );
        headers.location =
          headers.location.substring(0, position) +
          `%26state%3D${state}` +
          headers.location.substring(position);
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
      }).then((response) => {
        access_token = response.data.access_token;
        refresh_token = response.data.refresh_token;
        let referrer = req.headers.referer;
        lastRequestAccessToken = DateTime.fromHTTP(response.headers.date);
        access_token_expires_in = response.data.expires_in;
        req.session.token = response.data.access_token;
        req.session.refresh_token = response.data.refresh_token;
        req.session.expires_in = access_token_expires_in;
        res
          .setCookie('isLogin', true, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: true,
            path: '/',
          })
          .redirect(referrer);
      });
    }
  });
}
