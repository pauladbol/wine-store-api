import { listAllClients } from '../models/clients';
import { listAllPurchases } from '../models/purchases';
import { isUndefined } from 'util';
import { replaceCPFCharacters } from '../helpers/string-helper';

export const getAllClients = async () => {
  
    const clients = await listAllClients();
    const purchases = await listAllPurchases();

    const clientsMapped = mapClientByPurchase(clients, purchases);

    const clientsByPurchase = clientsMapped.map(client => clients[client.index]);

    return clientsByPurchase;
}


export const getClientMajorPurchase = async () => {

    const clients = await listAllClients();
    const purchases = await listAllPurchases();
    
    let biggestPurchase = purchases.reduce((accumulator, current) => 
                                    accumulator.valorTotal > current.valorTotal ? accumulator : current);

    let clientMajorPurchase;

    let purchaseCPF = replaceCPFCharacters(biggestPurchase.cliente);

    clientMajorPurchase = clients.find(client => {
        let clientCPF = replaceCPFCharacters(client.cpf);

        return purchaseCPF === clientCPF;
    });

    return clientMajorPurchase;
}

export const getLoyalClients = async () => {
    const clients = await listAllClients();
    const purchases = await listAllPurchases();

    const loyalClients = clients.filter(client => {
        let clientCPF = replaceCPFCharacters(client.cpf);

        let totalPurchases = 0;

        purchases.forEach(purchase => {

            let purchaseCPF = replaceCPFCharacters(purchase.cliente);
         
            if (purchaseCPF === clientCPF)
                totalPurchases = totalPurchases + 1;   
        });

        return totalPurchases >= 5;
    });

    return loyalClients;
}

export const getClientPatternRecommendation = async (id) => {
    const clients = await listAllClients();
    const purchases = await listAllPurchases();

    const client = clients.find(client => client.id == id);

    let clientCPF = replaceCPFCharacters(client.cpf);
  
    const clientPurchases = purchases.filter(purchase => {
        let purchaseCPF = replaceCPFCharacters(purchase.cliente);

        return purchaseCPF === clientCPF;   
    });

    let recommendation = getRecommendation(clientPurchases);

    return recommendation;

}
const mapClientByPurchase = (clients, purchases) => {

    const clientsMapped = clients.map((client, index) => {
        let clientCPF = replaceCPFCharacters(client.cpf);
        let total = 0;

        purchases.forEach(purchase => {

            let purchaseCPF = replaceCPFCharacters(purchase.cliente);
             
            if (purchaseCPF === clientCPF)
                total = total + purchase.valorTotal;
        });
        
        return { index: index, value: total };
    });

    clientsMapped.sort((prev, curr) => {
        if (prev.value > curr.value) 
            return 1;
          
        if (prev.value < curr.value) 
            return -1;
          
        return 0;
    });

    return clientsMapped;
}

const getRecommendation = (clientPurchases) => {
    let clientItems = [];
    let categories = [];
    let varieties = [];

    clientPurchases.forEach(purchase => {
        purchase.itens.forEach((item) => {
            clientItems.push(item);
            categories.push(item.categoria);
            varieties.push(item.variedade);
        })
    })

    let categoriesCounted = categories.reduce((accumulator, current) => 
                                            accumulator.set(current, accumulator.get(current) + 1 || 1), new Map());
   
    let varietiesCounted =  varieties.reduce((accumulator, current) => 
                                            accumulator.set(current, accumulator.get(current) + 1 || 1), new Map());
      
    let majorCategory = [...categoriesCounted.entries()].reduce((accumulator, current) => 
                                            current[1] > accumulator[1] ? current : accumulator);

    let majorVariety = [...varietiesCounted.entries()].reduce((accumulator, current) => 
                                            current[1] > accumulator[1] ? current : accumulator);

    let recommendation;
    
    recommendation = clientItems.find(item => item.categoria == majorCategory[0] && item.variedade == majorVariety[0]);

    if (!recommendation)
        recommendation = clientItems.find(item => item.categoria == majorCategory[0]);

    return recommendation;

}
