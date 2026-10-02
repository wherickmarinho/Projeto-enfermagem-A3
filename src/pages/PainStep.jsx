import OptionCard from '../components/OptionCard';
import BodyMap from '../components/BodyMap';
import { bodyParts, painLevels } from '../data/options';
import { hoverSpeechProps } from '../utils/speech';

// Etapa 3: intensidade da dor e local (o local só aparece se houver dor).
export default function PainStep({ answers, onChange, notify }) {
  const hasPain = answers.painLevel !== null && answers.painLevel !== 'sem-dor';
  const selectedNames = bodyParts
    .filter((part) => answers.painAreas.includes(part.id))
    .map((part) => part.label);

  function selectLevel(level) {
    if (answers.painLevel === level.id) {
      onChange('painLevel', null);
      onChange('painAreas', []);
      notify('Intensidade da dor desmarcada.');
      return;
    }
    onChange('painLevel', level.id);
    // Se não há dor, não faz sentido manter locais marcados (prevenção de erros)
    if (level.id === 'sem-dor') onChange('painAreas', []);
    notify(`Selecionado: ${level.label}`);
  }

  function toggleArea(partId) {
    const part = bodyParts.find((p) => p.id === partId);
    const isSelected = answers.painAreas.includes(partId);
    let next;

    if (isSelected) {
      next = answers.painAreas.filter((id) => id !== partId);
    } else if (partId === 'nao-sei') {
      next = ['nao-sei']; // "Não sei indicar" não combina com outros locais
    } else {
      next = [...answers.painAreas.filter((id) => id !== 'nao-sei'), partId];
    }

    onChange('painAreas', next);
    notify(isSelected ? `Local removido: ${part.label}` : `Local selecionado: ${part.label}`);
  }

  return (
    <>
      <h2 className="section-title" {...hoverSpeechProps('Quanto dói?')}>Quanto dói?</h2>
      <div className="option-grid pain-scale">
        {painLevels.map((level) => (
          <OptionCard
            key={level.id}
            icon={level.icon}
            label={level.label}
            detail={`Nota ${level.scale}`}
            color={level.color}
            selected={answers.painLevel === level.id}
            onClick={() => selectLevel(level)}
          />
        ))}
      </div>

      {hasPain && (
        <>
          <h2 className="section-title" {...hoverSpeechProps('Onde dói?')}>Onde dói?</h2>
          <div className="body-section">
            <div className="body-figure">
              <BodyMap selected={answers.painAreas} onToggle={toggleArea} />
              <p className="body-selected">
                {selectedNames.length > 0
                  ? `Selecionado: ${selectedNames.join(', ')}`
                  : 'Toque no desenho ou nos botões.'}
              </p>
            </div>
            <div className="option-grid option-grid-small">
              {bodyParts.map((part) => (
                <OptionCard
                  key={part.id}
                  icon={part.icon}
                  label={part.label}
                  selected={answers.painAreas.includes(part.id)}
                  onClick={() => toggleArea(part.id)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
