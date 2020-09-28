import React,{ useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import Player from './Player';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebAPi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebAPi();


function App() {
  const [{ user, token },dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash="";

    const _token = hash.access_token;
    if(_token){
      dispatch({
        type: 'SET_TOKEN',
        token: _token
      })

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        });
      });

      spotify.getPlaylist('1SdXYG6Xr2IbYTvrdMenPK').then(response =>  
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        }))
    }
  },[]);

  console.log("token : ",token);
  console.log("user",user);

  return (
    <div className="app">
      {
        token ? (<Player spotify={spotify} />) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
