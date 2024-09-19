// src/services/authService.js

import axios from "axios";

export const getUserInfo = async (code) => {
    try {
      const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code'
      });

      const { access_token } = tokenResponse.data;

      const userResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      return userResponse.data;
    } catch (error) {
      throw new Error('error ' + error.message);
    }
  };

