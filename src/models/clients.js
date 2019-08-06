import { getApplicationResponse } from '../config/services-call';

export const listAllClients = async () => {
    const clients = await getApplicationResponse('598b16291100004705515ec5');
    return clients.data;
}