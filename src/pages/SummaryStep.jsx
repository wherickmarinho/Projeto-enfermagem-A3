import Button from '../components/Button';
import { bodyParts, feelings, needs, painLevels } from '../data/options';

// Etapa 5: resumo de tudo o que a criança comunicou.
export default function SummaryStep({ answers, onChange, startedAt, onEdit }) {
  const feeling = feelings.find((f) => f.id === answers.feeling);
  const pain = painLevels.find((p) => p.id === answers.painLevel);
  const areas = bodyParts.filter((p) => answers.painAreas.includes(p.id));
  const needList = needs.filter((n) => answers.needs.includes(n.id));

  let child = answers.childName;
  if (answers.age !== '') child += `, ${answers.age} ano(s)`;

  let painPlace = areas.map((a) => a.label).join(', ');
  if (answers.painLevel === 'sem-dor') painPlace = 'Não se aplica';

  const rows = [
    { label: 'Criança', icon: '🧒', value: child, step: 0 },
    { label: 'Responsável presente', icon: '👪', value: answers.companion, step: 0 },
    { label: 'Humor', icon: feeling ? feeling.icon : '😶', value: feeling?.label, step: 1 },
    { label: 'Dor', icon: pain ? pain.icon : '🩹', value: pain && `${pain.label} (nota ${pain.scale})`, step: 2 },
    { label: 'Local da dor', icon: '📍', value: painPlace, step: 2 },
    { label: 'Necessidades', icon: '🙋', value: needList.map((n) => n.label).join(', '), step: 3 },
  ];

  const time = startedAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <p className="summary-meta">
        Início do atendimento: {time}. O resumo mostra apenas o que a criança comunicou.
      </p>

      <ul className="summary-list">
        {rows.map((row) => (
          <li key={row.label} className="summary-row">
            <span className="summary-icon" aria-hidden="true">{row.icon}</span>
            <div className="summary-content">
              <span className="summary-label">{row.label}</span>
              <span className="summary-value">
                {row.value || <span className="not-informed">Não informado</span>}
              </span>
            </div>
            <button
              type="button"
              className="link-button"
              onClick={() => onEdit(row.step)}
              aria-label={`Alterar ${row.label}`}
            >
              Alterar
            </button>
          </li>
        ))}
      </ul>

      <div className="field summary-notes">
        <label htmlFor="notes">
          Observações do profissional <span className="field-hint">(opcional)</span>
        </label>
        <textarea
          id="notes"
          value={answers.notes}
          onChange={(e) => onChange('notes', e.target.value)}
        />
      </div>

      <div className="summary-actions no-print">
        <Button variant="secondary" icon="🖨️" onClick={() => window.print()}>
          Imprimir resumo
        </Button>
      </div>
    </>
  );
}
