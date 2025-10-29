// Sistema simples de templates: armazena strings e faz replace de {{chave}}
const TEMPLATES = {
  home: `
    <section class="card">
      <h2>Bem-vindo</h2>
      <p>Este é um exemplo de Single Page Application usando manipulação do DOM.</p>
      <p>Use o menu para navegar sem recarregar a página.</p>
    </section>
  `,
  form: `
    <section class="card">
      <h2>Formulário de Contato</h2>
      <div id="form-alerts" aria-live="polite" role="status"></div>
      <form id="contact-form" novalidate>

        <label for="nome">Nome completo *</label>
        <input id="nome" name="nome" type="text" aria-required="true" placeholder="João da Silva" />

        <label for="telefone">Telefone *</label>
        <input id="telefone" name="telefone" type="tel" placeholder="(11) 91234-5678" />

        <label for="email">E-mail *</label>
        <input id="email" name="email" type="text" aria-required="true" placeholder="voce@exemplo.com" />

        <label for="data_nascimento">Data de nascimento *</label>
        <input id="data_nascimento" name="data_nascimento" type="date" />

        <label for="endereco">Endereço (rua, número) *</label>
        <input id="endereco" name="endereco" type="text" placeholder="Rua Exemplo, 123" />

        <div class="row">
          <div>
            <label for="cidade">Cidade</label>
            <input id="cidade" name="cidade" type="text" />
          </div>
          <div>
            <label for="estado">Estado</label>
            <input id="estado" name="estado" type="text" />
          </div>
        </div>

        <label for="cep">CEP</label>
        <input id="cep" name="cep" type="text" placeholder="00000-000" />

        <label for="assunto">Assunto</label>
        <input id="assunto" name="assunto" type="text" />

        <label for="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" rows="4" maxlength="500" placeholder="Escreva sua mensagem..."></textarea>

        <div style="margin-top:.75rem">
          <button class="btn" type="submit">Enviar</button>
          <button class="btn secondary" type="button" id="reset-btn">Limpar</button>
        </div>
      </form>
    </section>
  `,
  sobre: `
    <section class="card">
      <h2>Sobre</h2>
      <p>Exercício para demonstrar manipulação do DOM, SPA, templates e validação de formulários.</p>
    </section>
  `
};

export function renderTemplate(name, data = {}){
  const app = document.getElementById('app');
  const raw = TEMPLATES[name];
  if(!raw) return;
  app.innerHTML = compile(raw, data);
}

export function compile(templateStr, data = {}){
  // substitui {{chave}} por data.chave
  return templateStr.replace(/{{\s*([a-zA-Z0-9_\.]+)\s*}}/g, (m, key) => {
    const parts = key.split('.');
    let v = data;
    for(const p of parts){
      v = v == null ? '' : v[p];
    }
    return v == null ? '' : String(v);
  });
}
