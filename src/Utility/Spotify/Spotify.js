const clientId = '87cfc90456484b70a7997e4351f62239';
const encClientId= encodeURIComponent(clientId);
const redirectUri = 'http://localhost:8888/callback';
const encRedirect_uri= encodeURIComponent(redirectUri);
const clientSecret = '7a948a4cc337480c944b750ace086b8e';
const url = 'https://accounts.spotify.com/authorize?response_type=token&client_id=' + encClientId + '&redirect_uri=' + encRedirect_uri;

let accessToken;
let expiresIn;

function getAccessToken() {

    if(accessToken) {
        return accessToken;    
    }

    const urlParams = new URLSearchParams(window.location.search);
    const urlAccessToken = urlParams.get('access_token');
    const urlExpiresIn = urlParams.get('expires_in');

    if (urlAccessToken && urlExpiresIn) {

        accessToken = urlAccessToken;
        expiresIn = urlExpiresIn;

        setTimeout(() => {
            accessToken = '';
          }, expiresIn * 1000);

        window.history.pushState({}, null, '/');

    } else {
        window.location = url;
    }
};

async function spotifySearch(term) {

    const accessToken = Spotify.getAccessToken();

    //included limit of 20 tracks and track type in search.
    const response = await fetch("https://api.spotify.com/v1/search?type=track&limit=20&q=" + term, {
        headers: { Authorization: "Bearer " + accessToken }
    });

    const jsonResponse = await response.json();

    if (!jsonResponse.tracks) {
        return [];
    };

    return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
    }));

}

