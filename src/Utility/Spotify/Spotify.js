const clientId = '87cfc90456484b70a7997e4351f62239';
//const encClientId= encodeURIComponent(clientId);
const redirectUri = 'http://localhost:3000';
//const encRedirect_uri= encodeURIComponent(redirectUri);
//const clientSecret = '7a948a4cc337480c944b750ace086b8e';
const url = 'https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-private&client_id=' + clientId + '&redirect_uri=' + redirectUri;
let accessToken;
let username;

async function getUsername() {
  if (username) {    
    return username;
  } else {
    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {Authorization: "Bearer " + accessToken}
    });

    const jsonResponse = await response.json();
    username = jsonResponse.id;
  }
}

function getAccessToken() {

    if(accessToken) {
        return accessToken;    
    }

    let urlParams = new URLSearchParams(window.location.hash.slice(1));
    let urlAccessToken = urlParams.get("access_token");
    let urlExpiresIn = urlParams.get("expires_in");



    if (urlAccessToken && urlExpiresIn) {

        accessToken = urlAccessToken;
        let expiresIn = urlExpiresIn;
        setTimeout(() => {
            accessToken = '';
          }, expiresIn * 1000);

        window.history.pushState({}, null, '/');
          return accessToken;
    } else {
        console.log('Redirecting to authorization URL:', url);
        window.location = url;
    }
};

async function spotifySearch(term) {

    accessToken = getAccessToken();
    //includ limit (&limit=...) and track type in search.
    const response = await fetch("https://api.spotify.com/v1/search?q=" + term + "&type=artist,track,album", {
        headers: { Authorization: "Bearer " + accessToken }
    });

    const jsonResponse = await response.json();

    console.log("search obj return=", jsonResponse )
    if (!jsonResponse.tracks) {
        console.log('none returned')
        return [];
    };

    return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        preview: track.preview_url
    }));
};

async function savePlaylist(playlistName, saveList) {

    accessToken = getAccessToken();
    getUsername();

    const responseNp = await fetch("https://api.spotify.com/v1/users/"+ username + "/playlists", {
        method: "POST",
        headers: { 
            "Content-Type":"application/json",
            "Authorization": "Bearer " + accessToken
        }, 
        body: JSON.stringify({ name: playlistName })
    });

    const jsonResponseNp = await responseNp.json();

    const playlistId = jsonResponseNp.id;

    return await fetch("https://api.spotify.com/v1/users/" +  username + "/playlists/" + playlistId + "/tracks", {
        method: "POST",    
        headers: {Authorization: "Bearer " + accessToken},
        body: JSON.stringify({ uris: saveList }),
    });
};

async function getUserPlaylists() {

    accessToken = getAccessToken();
    await getUsername();


    const response = await fetch("https://api.spotify.com/v1/users/" + username +"/playlists", {
        headers: { Authorization: "Bearer " + accessToken }
    });


    const jsonResponse = await response.json();

    return jsonResponse.items.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        }));
    
};

async function getPlaylistTracks(playlistId) {

    accessToken = getAccessToken();
    await getUsername();

    console.log ("token= " + accessToken)
    console.log("Username= " + username)
    console.log("Id= " + playlistId)

    const response = await fetch("https://api.spotify.com/v1/users/" + username + "/playlists/" + playlistId + "/tracks", {
        headers: { Authorization: "Bearer " + accessToken }
    })

    const jsonResponse = await response.json();

    console.log("response= ", jsonResponse)

    return jsonResponse.items.map(song => ({
        id: song.track.id,
        name: song.track.name,
        artist: song.track.artists[0].name,
        album: song.track.album.name,
        uri: song.track.uri,
        preview: song.track.preview_url
    }));
};


export {spotifySearch, savePlaylist, getUserPlaylists, getPlaylistTracks};