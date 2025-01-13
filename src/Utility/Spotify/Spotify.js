const clientId = 'b2a1a189a8954b718cf7bcd6e4d4faed';
const redirectUri = 'http://localhost:3000';
const scopes = [
    'playlist-modify-private',
    'playlist-read-private',
    'user-read-email',
    'user-read-private'
];
const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scopes.join(' '))}&redirect_uri=${encodeURIComponent(redirectUri)}`;
let accessToken;
let username;

async function getUsername() {
    if (username) {    
        return username;
    } else {
        try {
            console.log("Fetching username with access token:", accessToken);
            const response = await fetch("https://api.spotify.com/v1/me", {
                headers: { Authorization: "Bearer " + accessToken }
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Access forbidden: Check your scopes and permissions.');
                }
                throw new Error('Failed to fetch username');
            }

            const jsonResponse = await response.json();
            username = jsonResponse.id;
            console.log("Fetched Username:", username);
            return username;
        } catch (error) {
            console.error("Error fetching username:", error);
        }
    }
}

function getAccessToken() {
    if (accessToken) {
        return accessToken;    
    }

    let urlParams = new URLSearchParams(window.location.hash.slice(1));
    let urlAccessToken = urlParams.get("access_token");
    let urlExpiresIn = urlParams.get("expires_in");

    if (urlAccessToken && urlExpiresIn) {
        accessToken = urlAccessToken;
        let expiresIn = Number(urlExpiresIn);
        setTimeout(() => {
            accessToken = '';
        }, expiresIn * 1000);

        window.history.pushState({}, null, '/');
        console.log("Access Token Set:", accessToken);
        return accessToken;
    } else {
        console.log('Redirecting to authorization URL:', url);
        window.location = url;
    }
}

async function waitForAccessToken() {
    while (!accessToken) {
        accessToken = getAccessToken();
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    return accessToken;
}

async function getUserPlaylists() {
    await waitForAccessToken();
    console.log("Access Token:", accessToken);

    if (!accessToken) {
        console.error("Access token is undefined.");
        return [];
    }

    await getUsername();
    console.log("Username:", username);

    if (!username) {
        console.error("Username is undefined.");
        return [];
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/users/${username}/playlists`, {
            headers: { Authorization: "Bearer " + accessToken }
        });

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('Access forbidden: Check your scopes and permissions.');
            }
            throw new Error('Failed to fetch user playlists');
        }

        const jsonResponse = await response.json();
        console.log("User Playlists Response:", jsonResponse);

        return jsonResponse.items.map(playlist => ({
            id: playlist.id,
            name: playlist.name,
        }));
    } catch (error) {
        console.error("Error fetching user playlists:", error);
        return [];
    }
}

async function spotifySearch(term) {
    accessToken = getAccessToken();
    console.log("Access Token for search:", accessToken);

    const response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=artist,track,album`, {
        headers: { Authorization: "Bearer " + accessToken }
    });

    const jsonResponse = await response.json();
    console.log("Search Response:", jsonResponse);

    if (!jsonResponse.tracks) {
        console.log('No tracks returned');
        return [];
    }

    return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        preview: track.preview_url
    }));
}

async function savePlaylist(playlistName, saveList) {
    accessToken = getAccessToken();
    await getUsername();

    const responseNp = await fetch(`https://api.spotify.com/v1/users/${username}/playlists`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }, 
        body: JSON.stringify({ name: playlistName })
    });

    const jsonResponseNp = await responseNp.json();
    const playlistId = jsonResponseNp.id;

    return await fetch(`https://api.spotify.com/v1/users/${username}/playlists/${playlistId}/tracks`, {
        method: "POST",    
        headers: { Authorization: "Bearer " + accessToken },
        body: JSON.stringify({ uris: saveList }),
    });
}

async function getPlaylistTracks(playlistId) {
    accessToken = getAccessToken();
    await getUsername();

    console.log("Access Token:", accessToken);
    console.log("Username:", username);
    console.log("Playlist ID:", playlistId);

    const response = await fetch(`https://api.spotify.com/v1/users/${username}/playlists/${playlistId}/tracks`, {
        headers: { Authorization: "Bearer " + accessToken }
    });

    const jsonResponse = await response.json();
    console.log("Playlist Tracks Response:", jsonResponse);

    return jsonResponse.items.map(song => ({
        id: song.track.id,
        name: song.track.name,
        artist: song.track.artists[0].name,
        album: song.track.album.name,
        uri: song.track.uri,
        preview: song.track.preview_url
    }));
}

export { spotifySearch, savePlaylist, getUserPlaylists, getPlaylistTracks };