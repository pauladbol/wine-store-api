import express from 'express';
import clients from '../routes/clients';
import purchases from '../routes/purchases';
import { json, urlencoded } from 'body-parser';

const app = express();
const port = 3000;

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

clients(app);
purchases(app);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

export default app;