import { isSpeechAvailable, speak } from '../utils/speech';

const MIN_SCALE = 0.9;
const MAX_SCALE = 1.5;

export default function AccessibilityPanel({ settings, onChange }) {
  const speechAvailable = isSpeechAvailable();

  function update(field, value) {
    onChange({ ...settings, [field]: value });
  }

  function changeFontSize(delta) {
    const next = Math.round((settings.fontScale + delta) * 10) / 10;
    update('fontScale', Math.min(MAX_SCALE, Math.max(MIN_SCALE, next)));
  }

  function toggleSpeech(enabled) {
    update('speech', enabled);
    if (enabled) speak('Leitura em voz alta ativada.');
  }

  return (
    <div className="a11y-panel">
      <label className="a11y-option">
        <input
          type="checkbox"
          checked={settings.highContrast}
          onChange={(e) => update('highContrast', e.target.checked)}
        />
        <span className="a11y-text">
          <strong><span aria-hidden="true">🌓</span> Alto contraste</strong>
          <small>Fundo escuro e cores fortes para facilitar a leitura.</small>
        </span>
        <span className={`a11y-state ${settings.highContrast ? 'on' : ''}`} aria-hidden="true">
          {settings.highContrast ? 'Ativado' : 'Desativado'}
        </span>
      </label>

      <div className="a11y-option" role="group" aria-labelledby="font-size-title">
        <span className="a11y-text">
          <strong id="font-size-title"><span aria-hidden="true">🔠</span> Tamanho do texto</strong>
          <small>Aumente ou diminua as letras de todo o sistema.</small>
        </span>
        <div className="font-controls">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => changeFontSize(-0.1)}
            disabled={settings.fontScale <= MIN_SCALE}
            aria-label="Diminuir texto"
          >
            A−
          </button>
          <output className="font-value" aria-live="polite">
            {Math.round(settings.fontScale * 100)}%
          </output>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => changeFontSize(0.1)}
            disabled={settings.fontScale >= MAX_SCALE}
            aria-label="Aumentar texto"
          >
            A+
          </button>
        </div>
      </div>

      <label className="a11y-option">
        <input
          type="checkbox"
          checked={settings.speech}
          disabled={!speechAvailable}
          onChange={(e) => toggleSpeech(e.target.checked)}
        />
        <span className="a11y-text">
          <strong><span aria-hidden="true">🔊</span> Leitura em voz alta</strong>
          <small>
            {speechAvailable
              ? 'Fala as perguntas e opções ao passar o mouse e confirma o que foi escolhido.'
              : 'Seu navegador não oferece leitura em voz alta.'}
          </small>
        </span>
        <span className={`a11y-state ${settings.speech ? 'on' : ''}`} aria-hidden="true">
          {settings.speech ? 'Ativado' : 'Desativado'}
        </span>
      </label>
    </div>
  );
}
