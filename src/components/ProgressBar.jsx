// Mostra em qual etapa o atendimento está e permite voltar a etapas já visitadas.
export default function ProgressBar({ steps, current, maxStep, onStepClick }) {
  const percent = (current / (steps.length - 1)) * 100;

  return (
    <nav className="progress" aria-label="Etapas do atendimento">
      <p className="progress-text">
        Etapa {current + 1} de {steps.length}: <strong>{steps[current].title}</strong>
      </p>

      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      <ol className="progress-steps">
        {steps.map((step, index) => {
          const status = index === current ? 'current' : index < current ? 'done' : '';
          return (
            <li key={step.id}>
              <button
                type="button"
                className={`progress-step ${status}`}
                onClick={() => onStepClick(index)}
                disabled={index > maxStep}
                aria-current={index === current ? 'step' : undefined}
              >
                <span className="progress-number" aria-hidden="true">
                  {index < current ? '✓' : index + 1}
                </span>
                <span className="progress-label">{step.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
