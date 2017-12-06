import axios from 'axios';

export function getPost(postId) {
    return axios.get('https://jsonplaceholder.typicode.com/posts/' + postId);
}

export function getComments(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
}

let jsonp = require('jsonp');

jsonp('http://www.example.com/foo', null, function (err, data) {
    if (err) {
        console.error(err.message);
    } else {
        console.log(data);
    }
});