export default function HumanTime(dataStr: any){
    // Converte a string de data para um objeto Date
    const data = new Date(dataStr);
  
    // Verifica se a data é válida
    if (isNaN(data.getTime())) {
      return "Data inválida";
    }
  
    // Calcula a diferença entre a data atual e a data do post
    const diferencaTempo = data.getTime() - Date.now();
  
    // Converte a diferença de tempo em segundos
    const segundos = Math.abs(Math.floor(diferencaTempo / 1000));
  
    // Define as unidades de tempo e seus valores em segundos
    const unidadesTempo = [
      { nome: "dias", valor: 86400 },
      { nome: "horas", valor: 3600 },
      { nome: "minutos", valor: 60 },
    ];
  
    // Se a data for futura...
    if (data.getTime() > Date.now()) {
      // Percorre as unidades de tempo para encontrar a mais adequada
      for (const unidade of unidadesTempo) {
        const quantidade = Math.floor(segundos / unidade.valor);
        if (quantidade > 0) {
          // Retorna a string formatada com a quantidade e a unidade de tempo
          return `Expira em ${quantidade} ${unidade.nome}`;
        }
      }
    } else {
      // Retorna a string formatada para datas passadas
      for (const unidade of unidadesTempo) {
        const quantidade = Math.floor(segundos / unidade.valor);
        if (quantidade > 0) {
          // Retorna a string formatada com a quantidade e a unidade de tempo
          return `há ${quantidade} ${unidade.nome}`;
        }
      }
  
      // Se a diferença for menor que um minuto, retorna "publicado há agora"
      return " agora";
    }
}
