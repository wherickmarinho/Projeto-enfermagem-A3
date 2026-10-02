import Button from '../components/Button';
import { features, steps } from '../data/options';

const previewTiles = [
  { icon: '😊', label: 'Sentimentos' },
  { icon: '🩹', label: 'Dor' },
  { icon: '💧', label: 'Necessidades' },
  { icon: '🤗', label: 'Acolhimento' },
];

export default function HomePage({ message, onStart, onOpenAccessibility }) {
  return (
    <div className="home">
      {message && (
        <p className="alert alert-success" role="status">
          <span aria-hidden="true">✓</span> {message}
        </p>
      )}

      <section className="hero">
        <div className="hero-text">
          <p className="hero-badge">
            <span aria-hidden="true">💬</span> Fala Comigo
          </p>
          <h1>
            Toda criança merece <span className="highlight">ser ouvida</span>.
          </h1>
          <p className="hero-subtitle">
            Apoio à comunicação entre profissionais de saúde e crianças durante o atendimento,
            usando figuras simples e acessíveis.
          </p>
          <div className="hero-actions">
            <Button size="large" icon="▶" onClick={onStart}>
              Iniciar atendimento
            </Button>
            <Button size="large" variant="secondary" icon="♿" onClick={onOpenAccessibility}>
              Recursos de acessibilidade
            </Button>
          </div>
        </div>

        {/* Prévia decorativa das etapas */}
        <div className="hero-art" aria-hidden="true">
          {previewTiles.map((tile) => (
            <div key={tile.label} className="hero-tile">
              <span className="hero-tile-icon">{tile.icon}</span>
              <span>{tile.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="como-funciona">
        <h2 id="como-funciona">Como funciona</h2>
        <ol className="how-list">
          {steps.map((step, index) => (
            <li key={step.id}>
              <span className="how-number" aria-hidden="true">{index + 1}</span>
              <span aria-hidden="true">{step.icon}</span>
              {step.title}
            </li>
          ))}
        </ol>
      </section>

      <section className="section feature-grid" aria-label="Objetivos da ferramenta">
        {features.map((feature) => (
          <article key={feature.title} className="card feature">
            <span className="feature-icon" aria-hidden="true">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
