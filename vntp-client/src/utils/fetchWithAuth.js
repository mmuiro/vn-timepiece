export default async function(url, method, body=null) {
    const authToken = localStorage.getItem('authToken');
    let options = { method: method, headers: {}};
    if (body) {
        options.body = body;
        options.headers["Content-Type"] = "application/json";
    }
    if (authToken) {
        options.headers.Authorization = authToken;
    }
    return await fetch(url, options);
}
