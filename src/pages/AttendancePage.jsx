import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ProgressBar from '../components/ProgressBar';
import IdentificationStep from './IdentificationStep';
import FeelingStep from './FeelingStep';
import PainStep from './PainStep';
import NeedsStep from './NeedsStep';
import SummaryStep from './SummaryStep';
import { steps } from '../data/options';
import { hoverSpeechProps, speak } from '../utils/speech';

// Respostas do atendimento: ficam apenas no estado do React (sem banco de dados).
const EMPTY_ANSWERS = {
  childName: '',
  age: '',
  companion: '',
  feeling: null,
  painLevel: null,
  painAreas: [],
  needs: [],
  notes: '',
};

// Retorna uma mensagem de erro se a etapa atual não puder avançar.
function validate(step, answers) {
  if (step === 0) {
    if (answers.childName.trim() === '') {
      return 'Informe o nome ou as iniciais da criança para continuar.';
    }
    const age = Number(answers.age);
    if (answers.age !== '' && (age < 0 || age > 17)) {
      return 'A idade deve ser um número entre 0 e 17 anos.';
    }
  }
  if (step === 2) {
    const hasPain = answers.painLevel && answers.painLevel !== 'sem-dor';
    if (hasPain && answers.painAreas.length === 0) {
      return 'Mostre onde dói ou escolha a opção "Não sei indicar".';
    }
  }
  return '';
}

export default function AttendancePage({ settings, onExit }) {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0); // etapa mais avançada já visitada
  const [answers, setAnswers] = useState(EMPTY_ANSWERS);
  const [startedAt, setStartedAt] = useState(() => new Date());
  const [error, setError] = useState('');
  const [message, setMessage] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const headingRef = useRef(null);

  const current = steps[step];
  const isLastStep = step === steps.length - 1;

  // Ao trocar de etapa, o foco vai para o título (ajuda quem usa leitor de tela)
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  // A mensagem de confirmação some sozinha após 3 segundos
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  // Avisa antes de fechar/recarregar a aba com dados preenchidos
  useEffect(() => {
    if (answers.childName === '') return;
    function warn(event) {
      event.preventDefault();
      event.returnValue = '';
    }
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [answers.childName]);

  function notify(text) {
    setMessage({ text, id: Date.now() });
    if (settings.speech) speak(text);
  }

  function updateAnswer(field, value) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setError('');
  }

  function goToStep(index) {
    if (index > step) {
      const problem = validate(step, answers);
      if (problem) {
        setError(problem);
        return;
      }
    }
    setError('');
    setStep(index);
    setMaxStep((prev) => Math.max(prev, index));
  }

  function restart() {
    setAnswers(EMPTY_ANSWERS);
    setStep(0);
    setMaxStep(0);
    setStartedAt(new Date());
    setError('');
    setConfirmAction(null);
    notify('Atendimento reiniciado. As respostas foram apagadas.');
  }

  // Ações que apagam dados sempre pedem confirmação (prevenção de erros)
  const confirmations = {
    restart: {
      title: 'Reiniciar atendimento?',
      text: 'Todas as respostas serão apagadas e você voltará para a primeira etapa.',
      button: 'Sim, reiniciar',
      action: restart,
    },
    finish: {
      title: 'Finalizar atendimento?',
      text: 'As respostas serão apagadas desta tela. Se precisar, imprima o resumo antes.',
      button: 'Sim, finalizar',
      action: () => onExit('Atendimento finalizado com sucesso.'),
    },
    exit: {
      title: 'Sair do atendimento?',
      text: 'Os dados preenchidos até agora serão perdidos.',
      button: 'Sim, sair',
      action: () => onExit(''),
    },
  };
  const confirm = confirmAction ? confirmations[confirmAction] : null;

  function handleBack() {
    if (step > 0) {
      goToStep(step - 1);
    } else if (answers.childName.trim() !== '') {
      setConfirmAction('exit');
    } else {
      onExit('');
    }
  }

  function renderStep() {
    const props = { answers, onChange: updateAnswer, notify };
    switch (current.id) {
      case 'identificacao':
        return <IdentificationStep {...props} error={error} />;
      case 'sentimento':
        return <FeelingStep {...props} />;
      case 'dor':
        return <PainStep {...props} />;
      case 'necessidades':
        return <NeedsStep {...props} />;
      default:
        return <SummaryStep {...props} startedAt={startedAt} onEdit={goToStep} />;
    }
  }

  return (
    <div className="attendance">
      <ProgressBar steps={steps} current={step} maxStep={maxStep} onStepClick={goToStep} />

      <section className="card step-card" aria-labelledby="step-title">
        <div className="step-header">
          <span className="step-icon" aria-hidden="true">{current.icon}</span>
          <div>
            <h1
              id="step-title"
              className="step-title"
              ref={headingRef}
              tabIndex={-1}
              {...hoverSpeechProps(current.question)}
            >
              {current.question}
            </h1>
            <p className="step-hint">
              <span aria-hidden="true">💡</span> {current.hint}
            </p>
          </div>
        </div>

        {renderStep()}

        {error && (
          <p id="step-error" className="alert alert-error" role="alert">
            <span aria-hidden="true">⚠️</span> {error}
          </p>
        )}
      </section>

      <nav className="step-nav" aria-label="Navegação do atendimento">
        <Button variant="secondary" icon="←" onClick={handleBack}>
          {step === 0 ? 'Página inicial' : 'Voltar'}
        </Button>
        <Button variant="ghost" icon="↺" onClick={() => setConfirmAction('restart')}>
          Reiniciar
        </Button>
        {isLastStep ? (
          <Button variant="success" icon="✔" onClick={() => setConfirmAction('finish')}>
            Finalizar atendimento
          </Button>
        ) : (
          <Button onClick={() => goToStep(step + 1)}>
            Avançar <span aria-hidden="true">→</span>
          </Button>
        )}
      </nav>

      <Modal
        open={confirm !== null}
        title={confirm?.title}
        onClose={() => setConfirmAction(null)}
        actions={
          <>
            <Button variant="secondary" onClick={() => setConfirmAction(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirm?.action}>
              {confirm?.button}
            </Button>
          </>
        }
      >
        <p>{confirm?.text}</p>
      </Modal>

      {/* Região "status": leitores de tela anunciam as mensagens automaticamente */}
      <div className="toast" role="status" aria-live="polite">
        {message && (
          <>
            <span aria-hidden="true">✓</span> {message.text}
          </>
        )}
      </div>
    </div>
  );
}
