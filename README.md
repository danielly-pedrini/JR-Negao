# 🏗️ JR Negão - Site de Serviços

Site profissional para empresa de serviços de alvenaria, pintura, dedetização e limpeza de terrenos, com sistema de galeria de fotos Antes & Depois e integração com WhatsApp.

<img src="./assets/readme2.png" alt="imagem do readme">
<img src="./assets/readme2.png" alt="imagem do readme">

## ✨ Características

- 🎨 Design moderno e responsivo
- 🍃 Animações de folhas caindo (tema natureza)
- 📸 Carrossel duplo de fotos (Antes & Depois)
- 🔐 Painel administrativo para gerenciar imagens
- 💬 Integração direta com WhatsApp para orçamentos
- 📱 Totalmente responsivo (mobile-first)
- 🚀 Sem necessidade de backend ou banco de dados

## 📁 Estrutura do Projeto

```
jrnegao/
│
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── README.md           # Este arquivo
│
└── assets/             # Pasta de recursos
    ├── img-antes-1.jpeg
    ├── img-antes-2.jpeg
    ├── img-depois-1.jpeg
    └── img-depois-2.jpeg
```

## 🚀 Instalação

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (opcional, para desenvolvimento)

### Passo a Passo

1. **Clone ou baixe o projeto**
   ```bash
   git clone https://github.com/seu-usuario/jrnegao.git
   cd jrnegao
   ```

2. **Adicione as imagens padrão**
   - Coloque suas imagens na pasta `assets/`
   - Renomeie os arquivos conforme especificado:
     - `img-antes-1.jpeg`
     - `img-antes-2.jpeg`
     - `img-depois-1.jpeg`
     - `img-depois-2.jpeg`

3. **Abra o projeto**
   - **Opção 1:** Abra `index.html` diretamente no navegador
   - **Opção 2:** Use um servidor local:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (com http-server)
     npx http-server
     ```
   - Acesse: `http://localhost:8000`

## 🎯 Funcionalidades

### 1. Página Principal
- **Cabeçalho** com nome da empresa e slogan
- **Seção de Serviços** com 4 cards informativos:
  - 🏗️ Alvenaria
  - 🏠 Pintura de Imóvel
  - 🐛 Dedetização
  - 🌿 Limpeza de Terrenos

### 2. Galeria Antes & Depois
- Carrossel duplo sincronizado
- Navegação por setas
- Indicadores de posição (dots)
- Transição automática a cada 4 segundos
- Imagens responsivas

### 3. Formulário de Orçamento
- Campos: Nome, Telefone, Tipo de Serviço, Descrição
- Envio direto para WhatsApp
- Validação de campos obrigatórios

### 4. Elementos Visuais
- 🍃 Animação de folhas caindo
- 🎨 Gradientes e efeitos de hover
- 🌲 Decorações temáticas (árvores)
- 💬 Botão flutuante do WhatsApp

## 🔐 Painel Administrativo

### Acesso
1. Clique no link "JR Negão" no rodapé
2. Digite a senha: `admin123`

### Funcionalidades do Admin

#### Adicionar Imagens
1. Escolha entre "ANTES" ou "DEPOIS"
2. Clique em "📁 Escolher Imagens"
3. Selecione uma ou múltiplas imagens
4. Visualize a pré-visualização
5. Clique em "✓ Adicionar ao ANTES/DEPOIS"

#### Gerenciar Imagens
- Visualize todas as imagens em grade
- Remova imagens indesejadas com o botão "🗑️ Remover"
- As imagens são salvas localmente no navegador

#### Segurança
⚠️ **Importante:** Altere a senha padrão no arquivo `script.js`:
```javascript
const ADMIN_PASSWORD = 'admin123'; // Linha 29 - ALTERE AQUI
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização avançada
  - Flexbox & Grid Layout
  - Animações e transições
  - Gradientes lineares
  - Media queries (responsivo)
- **JavaScript (Vanilla)** - Interatividade
  - Manipulação do DOM
  - FileReader API (upload de imagens)
  - Event Listeners
  - LocalStorage (armazenamento de imagens)

## 🎨 Personalização

### Cores
Edite as cores no arquivo `styles.css`:
```css
/* Cores principais */
header {
    background: linear-gradient(135deg, #0e4e23d3 0%, #27a1419f 50%, #0e4e23c7 100%);
}

.btn-submit {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}
```

### Contato WhatsApp
Altere o número no arquivo `script.js`:
```javascript
const whatsappURL = `https://wa.me/5515992678046?text=...`; // Linha 295
```

### Serviços
Edite os cards de serviço em `index.html`:
```html
<div class="service-card">
    <h3>🏗️ Seu Serviço</h3>
    <p>Descrição do serviço...</p>
</div>
```

### Imagens Padrão
Substitua as imagens na pasta `assets/` mantendo os nomes:
- `img-antes-1.jpeg`
- `img-antes-2.jpeg`
- `img-depois-1.jpeg`
- `img-depois-2.jpeg`

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- **Desktop:** > 968px
- **Tablet:** 768px - 968px
- **Mobile:** < 768px

### Adaptações Mobile
- Carrosséis em coluna única
- Formulários com largura total
- Botões e textos otimizados para toque
- Imagens redimensionadas automaticamente

## 🔧 Solução de Problemas

### Imagens não aparecem?
1. Verifique se os arquivos estão na pasta `assets/`
2. Confirme que os nomes estão corretos (sem espaços)
3. Verifique o caminho no `script.js` (linhas 31-38)
4. Abra o Console do navegador (F12) para ver erros

### Animações lentas?
- Reduza o número de folhas em `script.js`:
```javascript
const leavesCount = 10; // Linha 2 (padrão: 20)
```

### WhatsApp não abre?
- Verifique se o número está no formato correto: `55` + `DDD` + `número`
- Exemplo: `5515999009900`

## 👩‍💻 Autora

**Danielly Pedrini**

- GitHub: [Danielly Pedrini](https://github.com/danielly-pedrini)
- LinkedIn: [[Danielly Pedrini](https://www.linkedin.com/in/daniellypedrini/)]
---

## ⭐ Mostre seu apoio

Se este projeto te ajudou ou você gostou do trabalho, considere dar uma ⭐️ no repositório!

---

<div align="center">
  
**Desenvolvido com ☕ e 📚 por [Danielly Pedrini](https://github.com/danielly-pedrini)**
<br>

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!

</div>

<div align="center">

![Status](https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsivo-Sim-blue?style=for-the-badge)

</div>
