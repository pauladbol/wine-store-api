import { getApplicationResponse } from '../config/services-call';

export const listAllPurchases = async () => {
    const purchases = await getApplicationResponse('598b16861100004905515ec7');
    return purchases.data;
}