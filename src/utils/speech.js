// Leitura em voz alta usando a API nativa do navegador (sem bibliotecas).

let enabled = false; // segue a opção "Leitura em voz alta" do painel de acessibilidade
let hoverTimer = null;

export function isSpeechAvailable() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function setSpeechEnabled(value) {
  enabled = value;
  if (!value && isSpeechAvailable()) window.speechSynthesis.cancel();
}

// Fala o texto imediatamente, interrompendo a fala anterior
export function speak(text) {
  if (!isSpeechAvailable()) return;
  clearTimeout(hoverTimer);
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  window.speechSynthesis.speak(utterance);
}

// Usado ao passar o mouse ou focar com o teclado.
// Espera um pouco antes de falar, para não ler todas as opções
// quando o mouse está apenas atravessando a tela.
export function speakOnHover(text) {
  if (!enabled) return;
  clearTimeout(hoverTimer);
  hoverTimer = setTimeout(() => speak(text), 250);
}

export function cancelHoverSpeech() {
  clearTimeout(hoverTimer);
}

// Atalho para colocar nos elementos: {...hoverSpeechProps('Texto')}
export function hoverSpeechProps(text) {
  return {
    onMouseEnter: () => speakOnHover(text),
    onMouseLeave: cancelHoverSpeech,
    onFocus: () => speakOnHover(text),
  };
}
