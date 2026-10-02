import { hoverSpeechProps } from '../utils/speech';

// Card grande e clicável usado para sentimentos, dor, partes do corpo e necessidades.
// aria-pressed informa aos leitores de tela se a opção está marcada.
// Com a leitura em voz alta ativada, a opção é falada ao passar o mouse.
export default function OptionCard({ icon, label, detail, color, selected, onClick }) {
  const classes = `option-card ${selected ? 'selected' : ''} ${color ? 'has-color' : ''}`;
  const spokenText = detail ? `${label}, ${detail}` : label;

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={selected}
      onClick={onClick}
      style={color ? { '--option-color': color } : undefined}
      {...hoverSpeechProps(spokenText)}
    >
      {selected && (
        <span className="option-check" aria-hidden="true">✓</span>
      )}
      <span className="option-icon" aria-hidden="true">{icon}</span>
      <span className="option-label">{label}</span>
      {detail && <span className="option-detail">{detail}</span>}
    </button>
  );
}
