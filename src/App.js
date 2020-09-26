import React,{ useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import Player from './Player';
import { getTokenFromUrl } from "./spotify";
import SpotifyWebAPi from "spotify-web-api-js";


function App() {
  const [token, setToken] = useState(null);
  const spotify = new SpotifyWebAPi();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash="";

    const _token = hash.access_token;
    if(_token){
      setToken(_token);

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        console.log("user",user);
      })
    }
                                        
    console.log("Token : ",token);
  },[]);

  return (
    <div className="app">
      {
        token ? (<Player />) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
