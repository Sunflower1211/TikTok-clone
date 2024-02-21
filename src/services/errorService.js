export const errorAxios = (error) => {
    let res = {};
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    return res;
};
