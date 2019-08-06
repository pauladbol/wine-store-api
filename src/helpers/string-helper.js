export const replaceCPFCharacters = (cpf) => {

    let cpfReplaced = cpf.replace(/[--.]/g, "");
                
    if (cpfReplaced.length > 11) {
        cpfReplaced = cpfReplaced.replace(/^(0)/g, "");
    }

    return cpfReplaced;
}
