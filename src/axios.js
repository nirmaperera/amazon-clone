import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-fir-2a086.cloudfunctions.net/api'
    // 'http://localhost:5001/fir-2a086/us-central1/api'
});

export default instance;