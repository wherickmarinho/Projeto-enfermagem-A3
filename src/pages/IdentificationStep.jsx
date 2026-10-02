// Etapa 1: dados mínimos para identificar o atendimento.
export default function IdentificationStep({ answers, onChange, error }) {
  const nameInvalid = Boolean(error) && answers.childName.trim() === '';
  const age = Number(answers.age);
  const ageInvalid = Boolean(error) && answers.age !== '' && (age < 0 || age > 17);

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="field">
        <label htmlFor="childName">
          Nome ou iniciais da criança <span className="field-hint">(obrigatório)</span>
        </label>
        <input
          id="childName"
          type="text"
          autoComplete="off"
          value={answers.childName}
          onChange={(e) => onChange('childName', e.target.value)}
          aria-invalid={nameInvalid}
          aria-describedby={nameInvalid ? 'step-error' : undefined}
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="age">
            Idade em anos <span className="field-hint">(opcional)</span>
          </label>
          <input
            id="age"
            type="number"
            inputMode="numeric"
            min="0"
            max="17"
            value={answers.age}
            onChange={(e) => onChange('age', e.target.value)}
            aria-invalid={ageInvalid}
            aria-describedby={ageInvalid ? 'step-error' : undefined}
          />
        </div>

        <div className="field">
          <label htmlFor="companion">
            Responsável presente <span className="field-hint">(opcional)</span>
          </label>
          <input
            id="companion"
            type="text"
            autoComplete="off"
            value={answers.companion}
            onChange={(e) => onChange('companion', e.target.value)}
          />
        </div>
      </div>

      <p className="privacy-note">
        <span aria-hidden="true">🔒</span> Os dados ficam apenas nesta tela e são apagados ao
        finalizar o atendimento.
      </p>
    </form>
  );
}
