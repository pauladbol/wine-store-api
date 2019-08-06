import app from './config/custom-express';

app.get('/', (request, response) => {
    response.status(200).send('Wine Store REST API');
})