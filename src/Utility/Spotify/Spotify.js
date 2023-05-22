const clientId = '87cfc90456484b70a7997e4351f62239';
//const encClientId= encodeURIComponent(clientId);
const redirectUri = 'http://localhost:3000';
//const encRedirect_uri= encodeURIComponent(redirectUri);
//const clientSecret = '7a948a4cc337480c944b750ace086b8e';
const url = 'https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=' + clientId + '&redirect_uri=' + redirectUri;
let accessToken;

//make spotify object function?
function getAccessToken() {

    if(accessToken) {
        return accessToken;    
    }

    let urlParams = new URLSearchParams(window.location.hash.slice(1));
    let urlAccessToken = urlParams.get("access_token");
    let urlExpiresIn = urlParams.get("expires_in");

    console.log("URL:", window.location.href);
    console.log('URL Access Token:', urlAccessToken);
    console.log('Access Token:', accessToken)
    console.log('URL Expires In:', urlExpiresIn);


    if (urlAccessToken && urlExpiresIn) {

        accessToken = urlAccessToken;
        let expiresIn = urlExpiresIn;
        console.log('Access Token2:', accessToken)
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
    console.log('URL Access Token2:', accessToken);
    //includ limit of 20 tracks and track type in search.
    const response = await fetch("https://api.spotify.com/v1/search?type=track&limit=20&q=" + term, {
        headers: { Authorization: "Bearer " + accessToken }
    });

    const jsonResponse = await response.json();

    if (!jsonResponse.tracks) {
        console.log('none returned')
        return [];
    };

    return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
    }));
};

async function savePlaylist(playlistName, saveList) {

    accessToken = getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {Authorization: "Bearer " + accessToken}
    });

    const jsonResponse = await response.json();
    let username = jsonResponse.id;
    console.log(username)
    const responseNp = await fetch("https://api.spotify.com/v1/users/"+ username + "/playlists", {
        method: "POST",
        headers: { 
            "Content-Type":"application/json",
            "Authorization": "Bearer " + accessToken
        }, 
        body: JSON.stringify({ name: playlistName })
    });

    const jsonResponseNp = await responseNp.json();

    console.log(jsonResponseNp)
    const playlistId = jsonResponseNp.id;

    return await fetch("https://api.spotify.com/v1/users/" +  username + "/playlists/" + playlistId + "/tracks", {
        method: "POST",    
        headers: {Authorization: "Bearer " + accessToken},
        body: JSON.stringify({ uris: saveList }),
    })
}


export {spotifySearch, savePlaylist};