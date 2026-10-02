import { useState } from 'react';
import Button from './Button';

// Jogo calmo de estourar bolhas para acalmar ou distrair a criança.
// Sem tempo, sem pontuação negativa e sem fim: as bolhas sempre voltam.

const COLORS = ['#9ec5fe', '#c3b1f5', '#a7e3d0', '#ffd3b5', '#f8b4d9'];
const BUBBLE_COUNT = 8;
let nextId = 0;

// Cria uma bolha com posição, tamanho, cor e velocidade aleatórios.
// "starting" = bolhas iniciais já começam espalhadas pela tela.
function createBubble(starting = false) {
  return {
    id: nextId++,
    x: Math.random() * 80, // posição horizontal (%)
    y: 5 + Math.random() * 70, // posição usada quando o movimento está reduzido
    size: 3.5 + Math.random() * 3, // tamanho em rem (bolhas grandes = fáceis de tocar)
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    duration: 9 + Math.random() * 7, // segundos para subir (devagar = calmo)
    delay: starting ? -Math.random() * 12 : 0,
    popped: false,
  };
}

// Som suave de "pop" gerado pelo próprio navegador (Web Audio API)
let audioContext = null;
function playPop() {
  audioContext = audioContext || new AudioContext();
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.frequency.setValueAtTime(600, now);
  oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.12);
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.12);
}

export default function BubbleGame() {
  const [bubbles, setBubbles] = useState(() =>
    Array.from({ length: BUBBLE_COUNT }, () => createBubble(true))
  );
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);

  function pop(bubble) {
    if (bubble.popped) return;
    setBubbles((prev) => prev.map((b) => (b.id === bubble.id ? { ...b, popped: true } : b)));
    setCount((c) => c + 1);
    if (sound) playPop();

    // Depois da animação de estouro, a bolha é trocada por uma nova
    setTimeout(() => {
      setBubbles((prev) => prev.map((b) => (b.id === bubble.id ? createBubble() : b)));
    }, 300);
  }

  return (
    <div className="game">
      <p className="game-intro">
        Respire fundo e estoure as bolhas no seu tempo. Não existe certo ou errado.{' '}
        <span aria-hidden="true">🌈</span>
      </p>

      <div className="game-controls">
        <Button variant="secondary" icon={paused ? '▶' : '⏸'} onClick={() => setPaused(!paused)}>
          {paused ? 'Continuar' : 'Pausar'}
        </Button>
        <Button
          variant="secondary"
          icon={sound ? '🔊' : '🔇'}
          aria-pressed={sound}
          onClick={() => setSound(!sound)}
        >
          {sound ? 'Som ligado' : 'Som desligado'}
        </Button>
        <p className="game-score" aria-live="polite">
          <span aria-hidden="true">🫧</span> {count} {count === 1 ? 'bolha estourada' : 'bolhas estouradas'}
        </p>
      </div>

      <div className={`game-area ${paused ? 'paused' : ''}`}>
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="bubble-wrap"
            style={{
              left: `${bubble.x}%`,
              '--y': `${bubble.y}%`,
              '--size': `${bubble.size}rem`,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
            }}
          >
            <button
              type="button"
              className={`bubble ${bubble.popped ? 'popping' : ''}`}
              style={{ '--bubble-color': bubble.color }}
              onClick={() => pop(bubble)}
              aria-label="Estourar bolha"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
