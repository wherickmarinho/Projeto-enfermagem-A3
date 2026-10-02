import { useEffect, useState } from 'react';
import Button from './components/Button';
import Modal from './components/Modal';
import AccessibilityPanel from './components/AccessibilityPanel';
import HelpContent from './components/HelpContent';
import BubbleGame from './components/BubbleGame';
import HomePage from './pages/HomePage';
import AttendancePage from './pages/AttendancePage';
import { setSpeechEnabled } from './utils/speech';

const DEFAULT_SETTINGS = { highContrast: false, fontScale: 1, speech: false };

// As preferências de acessibilidade ficam salvas no navegador.
function loadSettings() {
  try {
    const saved = localStorage.getItem('fala-comigo-acessibilidade');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'attendance'
  const [homeMessage, setHomeMessage] = useState('');
  const [settings, setSettings] = useState(loadSettings);
  const [openPanel, setOpenPanel] = useState(null); // 'accessibility' | 'help' | 'game' | null

  // Aplica as preferências de acessibilidade em toda a página
  useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontScale * 100}%`;
    document.body.classList.toggle('high-contrast', settings.highContrast);
    setSpeechEnabled(settings.speech);
    try {
      localStorage.setItem('fala-comigo-acessibilidade', JSON.stringify(settings));
    } catch {
      // Sem armazenamento disponível: as preferências valem só nesta sessão
    }
  }, [settings]);

  function startAttendance() {
    setHomeMessage('');
    setPage('attendance');
  }

  function exitAttendance(message) {
    setHomeMessage(message);
    setPage('home');
  }

  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>

      <header className="app-header">
        <div className="container header-inner">
          <p className="brand">
            <span className="brand-logo" aria-hidden="true">💬</span>
            <span className="brand-text">
              <span className="brand-name">Fala Comigo</span>
              <span className="brand-tagline">Comunicação no atendimento infantil</span>
            </span>
          </p>
          <div className="header-actions">
            <Button variant="ghost" icon="🫧" onClick={() => setOpenPanel('game')}>
              Brincar
            </Button>
            <Button variant="ghost" icon="❓" onClick={() => setOpenPanel('help')}>
              Ajuda
            </Button>
            <Button variant="ghost" icon="♿" onClick={() => setOpenPanel('accessibility')}>
              Acessibilidade
            </Button>
          </div>
        </div>
      </header>

      <main id="conteudo" className="container main" tabIndex={-1}>
        {page === 'home' ? (
          <HomePage
            message={homeMessage}
            onStart={startAttendance}
            onOpenAccessibility={() => setOpenPanel('accessibility')}
          />
        ) : (
          <AttendancePage settings={settings} onExit={exitAttendance} />
        )}
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>
            <span aria-hidden="true">ℹ️</span> <strong>Importante:</strong> esta ferramenta serve
            apenas como apoio à comunicação. Não realiza diagnósticos, não recomenda medicamentos
            e não substitui a avaliação do profissional de saúde.
          </p>
        </div>
      </footer>

      <Modal
        open={openPanel === 'accessibility'}
        title="Acessibilidade"
        onClose={() => setOpenPanel(null)}
        actions={
          <>
            <Button variant="secondary" onClick={() => setSettings(DEFAULT_SETTINGS)}>
              Restaurar padrão
            </Button>
            <Button onClick={() => setOpenPanel(null)}>Fechar</Button>
          </>
        }
      >
        <AccessibilityPanel settings={settings} onChange={setSettings} />
      </Modal>

      <Modal
        open={openPanel === 'help'}
        title="Ajuda"
        onClose={() => setOpenPanel(null)}
        actions={<Button onClick={() => setOpenPanel(null)}>Entendi</Button>}
      >
        <HelpContent />
      </Modal>

      {/* O jogo abre por cima da tela: o atendimento continua salvo por baixo */}
      <Modal
        open={openPanel === 'game'}
        title="Hora de brincar"
        className="modal-game"
        onClose={() => setOpenPanel(null)}
        actions={<Button icon="←" onClick={() => setOpenPanel(null)}>Voltar</Button>}
      >
        {openPanel === 'game' && <BubbleGame />}
      </Modal>
    </>
  );
}
