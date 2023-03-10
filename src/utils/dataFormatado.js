const getDataFormatada = () => {
    let dataAtual = new Date();
    let options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    let dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);
    return dataFormatada;
}

module.exports = {
    getDataFormatada
}