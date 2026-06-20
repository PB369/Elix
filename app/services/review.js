

import data from "../Data/data.json";

export function getMacrotemas() {
  return data.macrotemas.map((macrotema) => ({
    id: macrotema.id,
    nome: macrotema.nome,
    status_consolidacao: macrotema.status_consolidacao,
    liquido_percentual: macrotema.liquido_percentual,
    subtemas_ativos: macrotema.subtemas?.length || 0,
  }));
}

export function getMacrotemaById(macrotemaId) {
  return data.macrotemas.find((macrotema) => macrotema.id === macrotemaId);
}

export function getTodasPerguntas() {
  const perguntas = [];

  data.macrotemas.forEach((macrotema) => {
    macrotema.subtemas.forEach((subtema) => {
      subtema.conceitos.forEach((conceito) => {
        conceito.perguntas.forEach((pergunta) => {
          perguntas.push({
            ...pergunta,
            macrotema_id: macrotema.id,
            macrotema_nome: macrotema.nome,
            subtema_id: subtema.id,
            subtema_nome: subtema.nome,
            conceito_id: conceito.id,
            conceito_nome: conceito.nome,
          });
        });
      });
    });
  });

  return perguntas;
}
