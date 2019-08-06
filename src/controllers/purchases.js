import { listAllPurchases } from '../models/purchases';

export const getAllPurchases = async () => {
    const purchases = await listAllPurchases();

    return purchases;
};