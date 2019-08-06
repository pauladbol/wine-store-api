import { getAllClients, getClientMajorPurchase, getLoyalClients, getClientPatternRecommendation } from '../controllers/clients';

module.exports = (app) => {

    app.get('/clients', async (req, res) => {
        try {
            const allClients = await getAllClients();
            res.status(200).send(allClients);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.get('/clients/majorpurchase', async (req, res) => {
        try {
            const client = await getClientMajorPurchase();
            res.status(200).send(client);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
 
    app.get('/clients/loyalty', async (req, res) => {
        try {
            const clients = await getLoyalClients();
            res.status(200).send(clients);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.get('/clients/:id/recommend', async (req, res) => {
        try {
            const wine = await getClientPatternRecommendation(req.params.id);
            res.status(200).send(wine);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
}