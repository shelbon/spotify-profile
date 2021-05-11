
import axios from 'axios';

export default async function (fastify, opts) {
 
  fastify.get('/refresh_token', function (req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const params = {
      client_id: this.config.CLIENT_ID,
      client_secret: this.config.CLIENT_SECRET,
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
        res.send({
          access_token: access_token,
        });
      })
      .catch((e) => {
        console.error(e.response.data);
      });
  });
}
