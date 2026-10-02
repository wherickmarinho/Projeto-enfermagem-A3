// Todas as opções do sistema ficam aqui.
// Para adicionar ou alterar uma opção, basta editar estes arrays:
// os cards são gerados automaticamente a partir deles.

export const steps = [
  {
    id: 'identificacao',
    title: 'Identificação',
    icon: '📝',
    question: 'Quem está sendo atendido?',
    hint: 'Preencha os dados básicos. Apenas o nome ou as iniciais são obrigatórios.',
  },
  {
    id: 'sentimento',
    title: 'Sentimentos',
    icon: '😊',
    question: 'Como você está se sentindo?',
    hint: 'Peça para a criança tocar na figura que mostra como ela está. Toque de novo para desmarcar.',
  },
  {
    id: 'dor',
    title: 'Dor',
    icon: '🩹',
    question: 'Você está sentindo dor?',
    hint: 'Primeiro escolha a intensidade da dor. Depois, mostre onde dói.',
  },
  {
    id: 'necessidades',
    title: 'Necessidades',
    icon: '🙋',
    question: 'O que você precisa?',
    hint: 'É possível escolher mais de uma opção.',
  },
  {
    id: 'resumo',
    title: 'Resumo',
    icon: '📋',
    question: 'Resumo do atendimento',
    hint: 'Confira as respostas. Use "Alterar" para corrigir alguma etapa.',
  },
];

export const feelings = [
  { id: 'feliz', label: 'Feliz', icon: '😀' },
  { id: 'triste', label: 'Triste', icon: '😢' },
  { id: 'medo', label: 'Com medo', icon: '😨' },
  { id: 'nervoso', label: 'Nervoso', icon: '😬' },
  { id: 'cansado', label: 'Cansado', icon: '😴' },
  { id: 'confuso', label: 'Confuso', icon: '😕' },
  { id: 'raiva', label: 'Com raiva', icon: '😠' },
  { id: 'nao-sei', label: 'Não sei explicar', icon: '🤷' },
];

// A cor é apenas um reforço visual: cada nível também tem rosto, nome e nota.
export const painLevels = [
  { id: 'sem-dor', label: 'Sem dor', scale: '0', icon: '😀', color: '#2e7d32' },
  { id: 'leve', label: 'Dor leve', scale: '1 a 3', icon: '🙂', color: '#9e9d24' },
  { id: 'moderada', label: 'Dor moderada', scale: '4 a 6', icon: '😐', color: '#ef8c00' },
  { id: 'forte', label: 'Dor forte', scale: '7 a 8', icon: '😣', color: '#e65100' },
  { id: 'pior', label: 'Pior dor', scale: '9 a 10', icon: '😭', color: '#c62828' },
];

export const bodyParts = [
  { id: 'cabeca', label: 'Cabeça', icon: '🤕' },
  { id: 'ouvidos', label: 'Ouvidos', icon: '👂' },
  { id: 'garganta', label: 'Garganta', icon: '🗣️' },
  { id: 'peito', label: 'Peito', icon: '🫁' },
  { id: 'barriga', label: 'Barriga', icon: '🤢' },
  { id: 'costas', label: 'Costas', icon: '🧍' },
  { id: 'bracos', label: 'Braços', icon: '💪' },
  { id: 'maos', label: 'Mãos', icon: '✋' },
  { id: 'pernas', label: 'Pernas', icon: '🦵' },
  { id: 'pes', label: 'Pés', icon: '🦶' },
  { id: 'nao-sei', label: 'Não sei indicar', icon: '❓' },
];

export const needs = [
  { id: 'agua', label: 'Água', icon: '💧' },
  { id: 'comida', label: 'Comida', icon: '🍎' },
  { id: 'banheiro', label: 'Banheiro', icon: '🚻' },
  { id: 'descansar', label: 'Descansar', icon: '🛏️' },
  { id: 'ajuda', label: 'Ajuda', icon: '🆘' },
  { id: 'medo', label: 'Estou com medo', icon: '😰' },
  { id: 'falar', label: 'Quero falar', icon: '🗣️' },
  { id: 'nao-entendo', label: 'Não estou entendendo', icon: '❓' },
  { id: 'responsaveis', label: 'Quero meus responsáveis', icon: '👨‍👩‍👧' },
];

export const features = [
  {
    icon: '🖼️',
    title: 'Comunicação visual',
    text: 'Figuras grandes com texto para a criança apontar o que sente e precisa.',
  },
  {
    icon: '♿',
    title: 'Acessível',
    text: 'Alto contraste, ajuste do tamanho do texto, leitura em voz alta e uso pelo teclado.',
  },
  {
    icon: '⚡',
    title: 'Rápido de usar',
    text: 'Poucas etapas, navegação simples e um resumo claro ao final.',
  },
];
