# Manipulação do DOM — SPA

Projeto de exemplo para a terceira entrega — implementação de JavaScript avançado com SPA, sistema de templates, validação de formulário e uso de localStorage.

Estrutura do repositório:

- index.html
- css/styles.css
- js/
  - app.js
  - router.js
  - templates.js
  - validation.js
  - storage.js
- images/

Funcionalidades implementadas

- SPA básico com roteamento via hash (sem recarregar a página).
- Sistema simples de templates JavaScript (função `compile` que substitui {{chave}}).
- Formulário com verificação de consistência (validações de nome, e-mail, idade e comprimento da mensagem).
- Feedback visual inline (erros ao lado dos campos) e alertas de status.
- Persistência no `localStorage` para o formulário.

Como testar localmente

1) Servir os arquivos estáticos (qualquer servidor estático). Exemplo rápido com Python (PowerShell):

```powershell
python -m http.server 8000
# depois abra http://localhost:8000
```

Ou com Node (se tiver `http-server`):

```powershell
npx http-server -p 8000
```

Publicar no GitHub (passos rápidos)

1. Inicialize o repositório local e faça commit:

```powershell
git init
git add .
git commit -m "Entrega: SPA Manipulação do DOM"
```

2. Crie um repositório público no GitHub (pelo site) e copie a URL (ex.: https://github.com/SEU_USUARIO/nome-do-repo.git)

3. Adicione o remoto e faça push:

```powershell
git remote add origin https://github.com/SEU_USUARIO/nome-do-repo.git
git branch -M main
git push -u origin main
```

Observação importante: o repositório precisa estar configurado como PÚBLICO; se estiver privado a entrega não será corrigida.

Se quiser, eu posso:
- Ajudar a gerar o README em português mais detalhado (já incluído),
- Gerar um .gitignore recomendado,
- Ou, se autorizar, posso criar as instruções exatas para configurar o repositório remoto.

Testes

Você pode rodar um teste simples da função `compile()` (systema de templates) com Node.js:

```powershell
cd 'C:\Users\User\Documents\Dev\Manipulação do DOM'
npm test
```

O script executará `js/tests/run-tests.js` e exibirá PASS/FAIL para casos básicos.
# Manipula-o-do-DOM-
