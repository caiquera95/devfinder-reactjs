import axios from 'axios';

const api = axios.create ({
    baseURL : 'https://api.github.com',
    // client_id: 'Iv1.63833a84c260cc40',
    // cliente_secret: '9b83e8cfe4ca85f81b94d6764ed193e427adc89e'
});



export default api;