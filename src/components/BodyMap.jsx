import { bodyParts } from '../data/options';
import { cancelHoverSpeech, speakOnHover } from '../utils/speech';

// Desenho simples do corpo (vista de frente). Clicar numa região marca/desmarca o local.
// O SVG é um atalho visual para o mouse/toque; quem usa teclado ou leitor de tela
// utiliza os botões com texto ao lado, por isso o desenho fica com aria-hidden.
export default function BodyMap({ selected, onToggle }) {
  function region(id) {
    const label = bodyParts.find((part) => part.id === id).label;
    return {
      className: `body-part ${selected.includes(id) ? 'selected' : ''}`,
      onClick: () => onToggle(id),
      onMouseEnter: () => speakOnHover(label),
      onMouseLeave: cancelHoverSpeech,
    };
  }

  return (
    <svg className="body-map" viewBox="0 0 200 380" aria-hidden="true">
      {/* Braços e mãos */}
      <rect x="32" y="98" width="24" height="110" rx="12" {...region('bracos')} />
      <rect x="144" y="98" width="24" height="110" rx="12" {...region('bracos')} />
      <circle cx="44" cy="222" r="13" {...region('maos')} />
      <circle cx="156" cy="222" r="13" {...region('maos')} />

      {/* Pernas e pés */}
      <rect x="68" y="214" width="28" height="130" rx="12" {...region('pernas')} />
      <rect x="104" y="214" width="28" height="130" rx="12" {...region('pernas')} />
      <ellipse cx="78" cy="356" rx="20" ry="10" {...region('pes')} />
      <ellipse cx="122" cy="356" rx="20" ry="10" {...region('pes')} />

      {/* Tronco */}
      <rect x="62" y="94" width="76" height="62" rx="14" {...region('peito')} />
      <rect x="66" y="158" width="68" height="56" rx="12" {...region('barriga')} />

      {/* Cabeça, ouvidos e garganta */}
      <rect x="88" y="74" width="24" height="20" rx="4" {...region('garganta')} />
      <ellipse cx="66" cy="46" rx="7" ry="11" {...region('ouvidos')} />
      <ellipse cx="134" cy="46" rx="7" ry="11" {...region('ouvidos')} />
      <circle cx="100" cy="44" r="32" {...region('cabeca')} />
    </svg>
  );
}
