import { steps } from '../data/options';

export default function HelpContent() {
  return (
    <div className="help-content">
      <p>
        O <strong>Fala Comigo</strong> ajuda a criança a mostrar, com figuras, como se sente,
        se tem dor e do que precisa.
      </p>

      <h3>Passo a passo</h3>
      <ol>
        {steps.map((step) => (
          <li key={step.id}>
            <span aria-hidden="true">{step.icon}</span> <strong>{step.title}:</strong> {step.hint}
          </li>
        ))}
      </ol>

      <h3>Dicas</h3>
      <ul>
        <li>Toque em uma opção para marcar. Toque de novo para desmarcar.</li>
        <li>Use <strong>Voltar</strong> ou clique nas etapas do topo para corrigir respostas.</li>
        <li>Só a identificação é obrigatória. Se a criança não quiser responder, apenas avance.</li>
        <li>Em <strong>Acessibilidade</strong> é possível aumentar o texto, usar alto contraste e ativar a leitura em voz alta.</li>
        <li>Se a criança ficar ansiosa, use <strong>🫧 Brincar</strong> para uma pausa com bolhas. As respostas não são perdidas.</li>
        <li>Com a leitura em voz alta ligada, passe o mouse sobre uma pergunta ou opção para ouvi-la.</li>
      </ul>

      <h3>Teclado</h3>
      <ul>
        <li><kbd>Tab</kbd> e <kbd>Shift</kbd> + <kbd>Tab</kbd>: mover entre os botões</li>
        <li><kbd>Enter</kbd> ou <kbd>Espaço</kbd>: selecionar</li>
        <li><kbd>Esc</kbd>: fechar janelas</li>
      </ul>

      <h3>Importante</h3>
      <p>
        Esta ferramenta apoia a comunicação. Ela não faz diagnósticos e não substitui a
        avaliação do profissional de saúde.
      </p>
    </div>
  );
}
