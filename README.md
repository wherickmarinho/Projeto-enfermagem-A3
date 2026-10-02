# 💬 Fala Comigo

Ferramenta web de **apoio à comunicação** entre profissionais de saúde e crianças durante o atendimento, principalmente crianças com dificuldade de comunicação, deficiência auditiva, deficiência visual ou baixa visão, autismo ou dificuldade de expressar dor e sentimentos.

> ⚠️ O sistema **não faz diagnósticos**, **não recomenda medicamentos** e **não substitui** a avaliação do profissional de saúde. Ele serve apenas para apoiar a comunicação.

---

## ▶️ Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 20 ou mais recente.

```bash
npm install      # instala as dependências (só na primeira vez)
npm run dev      # inicia o projeto em modo de desenvolvimento
```

Abra no navegador o endereço exibido no terminal (normalmente `http://localhost:5173`).

Para gerar a versão final: `npm run build` (os arquivos ficam na pasta `dist/`).

---

## 1. Estrutura de pastas

```
projetoW/
├── index.html                  → página HTML base (lang="pt-BR")
├── package.json                → dependências e scripts
├── vite.config.js              → configuração do Vite
└── src/
    ├── main.jsx                → ponto de entrada do React
    ├── App.jsx                 → cabeçalho, rodapé, troca de páginas, acessibilidade e ajuda
    ├── components/             → peças reutilizáveis
    │   ├── Button.jsx          → botão padrão (mesmo visual em todo o sistema)
    │   ├── OptionCard.jsx      → card grande com ícone + texto (usado em TODAS as etapas de escolha)
    │   ├── ProgressBar.jsx     → indicador de etapas
    │   ├── Modal.jsx           → janela de confirmação/ajuda (elemento <dialog>)
    │   ├── AccessibilityPanel.jsx → alto contraste, tamanho do texto, voz
    │   ├── BodyMap.jsx         → desenho simples do corpo (SVG)
    │   └── HelpContent.jsx     → texto da ajuda
    ├── pages/
    │   ├── HomePage.jsx        → tela inicial
    │   ├── AttendancePage.jsx  → controla o atendimento (etapa atual, respostas, navegação)
    │   ├── IdentificationStep.jsx → etapa 1: identificação
    │   ├── FeelingStep.jsx     → etapa 2: como estou me sentindo
    │   ├── PainStep.jsx        → etapa 3: dor (intensidade + local)
    │   ├── NeedsStep.jsx       → etapa 4: o que preciso
    │   └── SummaryStep.jsx     → etapa 5: resumo
    ├── data/
    │   └── options.js          → arrays com todas as opções (sentimentos, dor, corpo, necessidades)
    ├── utils/
    │   └── speech.js           → leitura em voz alta (API nativa do navegador)
    └── styles/
        └── global.css          → todo o estilo, organizado em seções numeradas
```

## 2. Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica (`header`, `main`, `nav`, `section`, `footer`, `dialog`) |
| CSS3 puro | Estilo, variáveis de cor, grid responsivo, alto contraste, impressão |
| JavaScript | Lógica da aplicação |
| React | Componentes e estado (`useState`, `useEffect`) |
| Vite | Criação e execução do projeto |

**Nenhuma biblioteca extra** foi usada. Os ícones são emojis (não precisam de pacote e são reconhecidos por crianças) e a leitura em voz alta usa a `speechSynthesis`, que já vem no navegador.

## 3. Arquitetura (explicação rápida)

1. **`App.jsx`** decide qual página aparece (`home` ou `attendance`) e guarda as preferências de acessibilidade.
2. **`AttendancePage.jsx`** é o "cérebro" do atendimento: guarda a **etapa atual** e o objeto **`answers`** com todas as respostas. Ele passa as respostas e a função `onChange` para cada etapa.
3. Cada **etapa** (`FeelingStep`, `PainStep`…) só mostra opções e chama `onChange` quando algo é escolhido.
4. As opções vêm de **arrays em `data/options.js`** e são transformadas em cards com `.map()` → para adicionar uma opção nova, basta adicionar uma linha no array.
5. **Sem banco de dados**: tudo fica no estado do React e é apagado ao finalizar.

```
App ──► HomePage
   └──► AttendancePage (step, answers)
            ├── ProgressBar
            ├── IdentificationStep / FeelingStep / PainStep / NeedsStep / SummaryStep
            │        └── OptionCard (gerado a partir dos arrays)
            └── Modal (confirmações)
```

## 4. As 10 heurísticas de Nielsen aplicadas

| # | Heurística | Onde aparece na interface |
|---|---|---|
| 1 | **Visibilidade do status do sistema** | Barra de progresso com "Etapa 2 de 5: Sentimentos"; etapas concluídas com ✓; mensagem no topo após cada seleção ("Sentimento selecionado: Feliz"); contador de necessidades selecionadas; mensagem "Atendimento finalizado com sucesso" na tela inicial. |
| 2 | **Correspondência com o mundo real** | Perguntas na linguagem da criança ("Você está sentindo dor?", "O que você precisa?"); escala de dor com rostos e notas de 0 a 10, semelhante às escalas usadas na saúde; desenho do corpo para apontar onde dói. |
| 3 | **Controle e liberdade do usuário** | Botões Voltar / Avançar / Reiniciar; clicar numa etapa já visitada na barra de progresso; tocar de novo numa opção desmarca; botão "Alterar" em cada linha do resumo; Esc ou "Cancelar" fecham janelas. |
| 4 | **Consistência e padrões** | Um único componente `OptionCard` para todas as escolhas e um único `Button` para todos os botões; navegação sempre no mesmo lugar (rodapé da etapa); selecionado sempre indicado com borda + fundo + ✓. |
| 5 | **Prevenção de erros** | Reiniciar, finalizar e sair pedem confirmação (com "Cancelar" como primeira opção); ao escolher "Sem dor", os locais são apagados automaticamente; "Não sei indicar" desmarca os outros locais; aviso do navegador ao fechar a aba com dados preenchidos. |
| 6 | **Reconhecimento em vez de memorização** | Todas as opções são visíveis com ícone + texto; dica (💡) em cada etapa; o resumo mostra tudo de uma vez; os locais escolhidos aparecem escritos abaixo do desenho. |
| 7 | **Flexibilidade e eficiência** | Uso por toque, mouse ou teclado; pular para etapas já visitadas; etapas opcionais podem ser puladas; preferências de acessibilidade salvas para a próxima vez; impressão do resumo. |
| 8 | **Design estético e minimalista** | Poucas cores, muito espaço em branco, apenas uma pergunta por tela, sem animações chamativas; o mapa do corpo só aparece se houver dor. |
| 9 | **Reconhecer e corrigir erros** | Mensagens de erro claras com ⚠️ dizendo **o que fazer** ("Mostre onde dói ou escolha 'Não sei indicar'"); campo com erro fica com borda vermelha mais grossa; o erro some assim que o usuário corrige. |
| 10 | **Ajuda e documentação** | Botão "Ajuda" sempre visível no cabeçalho com passo a passo, dicas e atalhos de teclado; seção "Como funciona" na tela inicial. |

## 5. Acessibilidade implementada

- **Painel "Acessibilidade"** (cabeçalho e tela inicial): alto contraste, aumento/redução de texto (90% a 150%) e leitura em voz alta. As preferências ficam salvas no navegador.
- **Alto contraste**: fundo preto, texto branco e destaque amarelo, feito apenas trocando variáveis CSS.
- **Tamanho do texto**: todo o CSS usa `rem`, então o sistema inteiro cresce junto.
- **Leitura em voz alta**: fala as perguntas e as opções ao passar o mouse (ou ao chegar nelas com `Tab`) e confirma em voz a opção escolhida. Útil para baixa visão e para crianças que ainda não leem.
- **Não depende só da cor**: seleção = borda + fundo + ✓; escala de dor = cor + rosto + nome + nota.
- **Não depende só de som**: todo retorno é visual (importante para deficiência auditiva).
- **Botões grandes**: no mínimo 48px de altura; cards de opção com cerca de 9rem.
- **Teclado**: tudo é `<button>`, `<input>` ou `<label>` nativo; foco visível com contorno laranja (ciano no alto contraste); link "Pular para o conteúdo".
- **Leitores de tela**: HTML semântico, `lang="pt-BR"`, `<label>` em todos os campos, foco movido para o título ao trocar de etapa, ícones decorativos com `aria-hidden`.
- **ARIA só quando necessário**: `aria-pressed` (opção marcada), `aria-current="step"` (etapa atual), `aria-invalid` (campo com erro), `role="alert"` (erros) e `role="status"` (mensagens de confirmação).
- **Movimento reduzido**: respeita a configuração `prefers-reduced-motion` do sistema.
- **Jogo das bolhas (🫧 Brincar)**: pausa calmante para crianças ansiosas ou autistas. Não tem tempo, não tem derrota e não termina. As cores são suaves, o movimento é lento, há botão de pausar e o som fica desligado por padrão. Abre por cima do atendimento, sem perder as respostas.
- **Responsivo**: funciona em celular, tablet (prioridade) e computador.

## 6. Como apresentar para o professor (roteiro sugerido, ~10 min)

1. **Problema (1 min)** – Crianças com dificuldade de comunicação nem sempre conseguem dizer o que sentem. O Fala Comigo é uma ponte visual entre a criança e o profissional. Deixe claro que **não é diagnóstico**.
2. **Demonstração (4 min)** – Faça um atendimento completo no tablet ou no celular:
   - Tente avançar sem nome → mostre a mensagem de erro (**heurísticas 5 e 9**).
   - Escolha um sentimento → mostre o ✓ e a mensagem no topo (**heurística 1**).
   - Escolha "Dor moderada" e tente avançar sem local → erro explicativo; marque no desenho.
   - Volte uma etapa pela barra de progresso (**heurística 3**).
   - No resumo, use "Alterar" e depois "Imprimir".
   - Clique em "Reiniciar" → mostre a confirmação (**heurística 5**).
3. **Acessibilidade (2 min)** – Ative o alto contraste, aumente o texto, ligue a voz e navegue só com o teclado (`Tab` / `Enter`). Destaque que a seleção não depende só de cor.
4. **Nielsen (2 min)** – Use a tabela da seção 4 como slide, apontando cada item na tela.
5. **Código (1 min)** – Mostre `data/options.js` e o `.map()` em `FeelingStep.jsx`: adicionar uma opção é acrescentar uma linha no array. Mostre que `OptionCard` é reutilizado em todas as etapas.

**Frase de encerramento sugerida:** "Priorizamos simplicidade: poucas telas, poucas cores, botões grandes e nenhuma dependência além do React, porque o profissional precisa usar a ferramenta durante um atendimento real."
