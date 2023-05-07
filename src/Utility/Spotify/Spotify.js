const clientId = '87cfc90456484b70a7997e4351f62239';
const redirect_uri = 'http://localhost:8888/callback';
const clientSecret = '7a948a4cc337480c944b750ace086b8e';



const url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);