import OptionCard from '../components/OptionCard';
import { needs } from '../data/options';

// Etapa 4: necessidades (permite VÁRIAS opções).
export default function NeedsStep({ answers, onChange, notify }) {
  function toggle(need) {
    const isSelected = answers.needs.includes(need.id);
    const next = isSelected
      ? answers.needs.filter((id) => id !== need.id)
      : [...answers.needs, need.id];

    onChange('needs', next);
    notify(isSelected ? `Removido: ${need.label}` : `Selecionado: ${need.label}`);
  }

  return (
    <>
      <p className="selection-count">
        {answers.needs.length === 0
          ? 'Nenhuma opção selecionada.'
          : `${answers.needs.length} opção(ões) selecionada(s).`}
      </p>
      <div className="option-grid">
        {needs.map((need) => (
          <OptionCard
            key={need.id}
            icon={need.icon}
            label={need.label}
            selected={answers.needs.includes(need.id)}
            onClick={() => toggle(need)}
          />
        ))}
      </div>
    </>
  );
}
