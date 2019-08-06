import { getAllPurchases } from '../controllers/purchases';

module.exports = (app) => {

    app.get('/purchases', async (req, res) => {
        try {
            const allPurchases = await getAllPurchases();
            res.status(200).send(allPurchases);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
}