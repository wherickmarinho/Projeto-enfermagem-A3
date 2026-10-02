import OptionCard from '../components/OptionCard';
import { feelings } from '../data/options';

// Etapa 2: escolha de UM sentimento.
export default function FeelingStep({ answers, onChange, notify }) {
  function select(feeling) {
    // Clicar de novo na mesma opção desmarca (controle e liberdade do usuário)
    if (answers.feeling === feeling.id) {
      onChange('feeling', null);
      notify(`Seleção removida: ${feeling.label}`);
      return;
    }
    onChange('feeling', feeling.id);
    notify(`Sentimento selecionado: ${feeling.label}`);
  }

  return (
    <div className="option-grid">
      {feelings.map((feeling) => (
        <OptionCard
          key={feeling.id}
          icon={feeling.icon}
          label={feeling.label}
          selected={answers.feeling === feeling.id}
          onClick={() => select(feeling)}
        />
      ))}
    </div>
  );
}
