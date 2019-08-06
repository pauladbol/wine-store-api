import axios from 'axios';

const ENDPOINT = 'http://www.mocky.io/v2';

export const getApplicationResponse = (url_param) => {
    return axios.get(`${ENDPOINT}/${url_param}`);
}