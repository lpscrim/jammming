const clientId = "87cfc90456484b70a7997e4351f62239";
const redirectUrl = process.env.REACT_APP_URL_PATH;
const scope =
  "playlist-modify-private playlist-modify-public playlist-read-private user-read-email user-read-private";
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";

//TOKEN//
const currentToken = {
  get access_token() {
    return localStorage.getItem("access_token") || null;
  },
  get refresh_token() {
    return localStorage.getItem("refresh_token") || null;
  },
  get expires_in() {
    return localStorage.getItem("refresh_in") || null;
  },
  get expires() {
    return localStorage.getItem("expires") || null;
  },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry);
  },
};

const args = new URLSearchParams(window.location.search);
const code = args.get("code");

if (code) {
  (async () => {
    const token = await getAccessToken(code);
    currentToken.save(token);

    const url = new URL(window.location.href);
    url.searchParams.delete("code");

    const updatedUrl = url.search ? url.href : url.href.replace("?", "");
    window.history.replaceState({}, document.title, updatedUrl);
  })();
}

//AUTH LOGIC//
async function redirectToSpotifyAuthorize() {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const code_challenge_base64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  window.localStorage.setItem("code_verifier", code_verifier);

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.localStorage.setItem("redirected", "true");
  window.location.href = authUrl.toString();
}

let username;

async function getAccessToken(code) {
  const code_verifier = localStorage.getItem("code_verifier");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}

async function getUsername() {
  if (username) {
    return username;
  } else {
    if (!localStorage.getItem("redirected")) {
      redirectToSpotifyAuthorize();
    } else {
    }
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    });
    const jsonResponse = await response.json();
    username = jsonResponse.id;
    console.log("Fetched Username:", username);
    return username;
  }
}

async function getUserPlaylists() {
  console.log("Access Token:", currentToken.access_token);

  await getUsername();
  console.log("Username:", username);

  if (!username) {
    console.error("Username is undefined.");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${username}/playlists`,
      {
        headers: { Authorization: "Bearer " + currentToken.access_token },
      }
    );

    const jsonResponse = await response.json();
    console.log("User Playlists Response:", jsonResponse);

    return jsonResponse.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
    }));
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    return [];
  }
}

async function getOtherPlaylists(otherUser) {
  console.log("Access Token:", currentToken.access_token);

  if (!currentToken.access_token) {
    console.error("Access token is undefined.");
    return [];
  }

  console.log("Other Username:", otherUser);

  if (!otherUser) {
    throw new Error("Other Username is undefined.");
  }

  const response = await fetch(
    `https://api.spotify.com/v1/users/${otherUser}/playlists`,
    {
      headers: { Authorization: "Bearer " + currentToken.access_token },
    }
  );

  const jsonResponse = await response.json();
  console.log("Other User Playlists Response:", jsonResponse);

  return jsonResponse.items.map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
  }));
}

async function spotifySearch(term) {
  console.log("Access Token for search:", currentToken.access_token);

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${term}&type=artist,track,album`,
    {
      headers: { Authorization: "Bearer " + currentToken.access_token },
    }
  );

  const jsonResponse = await response.json();
  console.log("Search Response:", jsonResponse);

  if (!jsonResponse.tracks) {
    console.log("No tracks returned");
    return [];
  }

  return jsonResponse.tracks.items.map((track) => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    uri: track.uri,
    preview: track.preview_url,
  }));
}

async function savePlaylist(playlistName, saveList) {
  await getUsername();

  const responseNp = await fetch(
    `https://api.spotify.com/v1/users/${username}/playlists`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentToken.access_token,
      },
      body: JSON.stringify({ name: playlistName }),
    }
  );

  const jsonResponseNp = await responseNp.json();
  const playlistId = jsonResponseNp.id;

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunks = chunkArray(saveList, 100);

  for (const chunk of chunks) {
    await fetch(
      `https://api.spotify.com/v1/users/${username}/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: { Authorization: "Bearer " + currentToken.access_token },
        body: JSON.stringify({ uris: chunk }),
      }
    );
  }
}

async function getPlaylistTracks(playlistId) {
  await getUsername();

  console.log("Access Token:", currentToken.access_token);
  console.log("Username:", username);
  console.log("Playlist ID:", playlistId);

  const response = await fetch(
    `https://api.spotify.com/v1/users/${username}/playlists/${playlistId}/tracks`,
    {
      headers: { Authorization: "Bearer " + currentToken.access_token },
    }
  );

  const jsonResponse = await response.json();
  console.log("Playlist Tracks Response:", jsonResponse);

  const trackBatch = jsonResponse.items.map((song) => ({
    id: song.track.id,
    name: song.track.name,
    artist: song.track.artists[0].name,
    album: song.track.album.name,
    uri: song.track.uri,
    preview: song.track.preview_url,
  }));

  if (trackBatch.length < jsonResponse.total) {
    const remainingTracks = await getRemainingTracks(
      jsonResponse.total,
      jsonResponse.offset,
      playlistId
    );
    return trackBatch.concat(remainingTracks);
  } else {
    return trackBatch;
  }
}

async function getRemainingTracks(total, offset, playlistId) {
  const remainingTracks = [];
  const remaining = total - offset;

  for (let i = 100; i < remaining; i += 100) {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${username}/playlists/${playlistId}/tracks?offset=${i}`,
      {
        headers: { Authorization: "Bearer " + currentToken.access_token },
      }
    );

    const jsonResponse = await response.json();
    remainingTracks.push(
      ...jsonResponse.items.map((song) => ({
        id: song.track.id,
        name: song.track.name,
        artist: song.track.artists[0].name,
        album: song.track.album.name,
        uri: song.track.uri,
        preview: song.track.preview_url,
      }))
    );
  }

  return remainingTracks;
}

async function logout() {
  localStorage.clear();
  window.location.href = redirectUrl;
}

function checkTokenExpiration() {
    const expires = new Date(currentToken.expires);
    const now = new Date();
    if (expires <= now) {
      logout();
    }
  }
  
  setInterval(checkTokenExpiration, 10000); 

export {
  getAccessToken,
  logout,
  getOtherPlaylists,
  getUsername,
  spotifySearch,
  savePlaylist,
  getUserPlaylists,
  getPlaylistTracks,
};
