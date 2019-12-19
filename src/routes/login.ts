import express from 'express';
import axios from 'axios';
import env from "../constants/env";

const login = express.Router();

const STRAVA_URL = 'https://www.strava.com';

login.get('/auth', (req, res) => {
  res.redirect(`${STRAVA_URL}/oauth/authorize?client_id=40506&response_type=code&redirect_uri=http://142.93.33.162/login&approval_prompt=force&scope=activity:read_all,activity:write,profile:read_all`)
});

login.get('/login', async (req, res) => {
  const { code } = req.query;

  const response = await axios({
    params: {
      client_id: env.strava_client_id,
      client_secret: env.strava_client_secret,
      grant_type: 'authorization_code',
      code
    },
    method: 'POST',
    url: `${STRAVA_URL}/api/v3/oauth/token`
  });

  console.log(response.data);

  res.send('done')
});

export default login;
