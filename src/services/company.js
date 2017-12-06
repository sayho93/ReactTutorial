import axios from 'axios';
import * as Constants from '../const/constants';

const url = Constants.SERVER_URL;

export function getCompanyList() {
    return axios.get(url + "info/company");
}

export function getCompanyInfo(companyId) {
    return axios.get(url + `info/workplace/detail/${companyId}`);
}

export function getComments(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
}