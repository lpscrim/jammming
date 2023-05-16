const clientId = '87cfc90456484b70a7997e4351f62239';
//const encClientId= encodeURIComponent(clientId);
const redirectUri = 'http://localhost:3000';
//const encRedirect_uri= encodeURIComponent(redirectUri);
//const clientSecret = '7a948a4cc337480c944b750ace086b8e';
const url = 'https://accounts.spotify.com/authorize?response_type=token&scope=playlist-read-private&client_id=' + clientId + '&redirect_uri=' + redirectUri;

let accessToken;
let expiresIn;
const Spotify = {
    getAccessToken() {

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
            expiresIn = urlExpiresIn;
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
    },

    async search(term) {

        accessToken = Spotify.getAccessToken();

        console.log('URL Access Token2:', accessToken);
        //includ limit of 20 tracks (&limit=20) and track type in search.
        const response = await fetch("https://api.spotify.com/v1/search?type=track&q=" + term, {
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

    },

    async savePlaylist(playlistName, saveList) {

        accessToken = Spotify.getAccessToken();

        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {Authorization: "Bearer " + accessToken}
        });

        const jsonResponse = await response.json();

        let username = jsonResponse.id;

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
    }
};

export default Spotify;