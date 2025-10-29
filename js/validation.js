import { saveFormData, loadFormData } from './storage.js';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\+?[0-9\s\-()]{7,20}$/; // simples: aceita dígitos, espaços, parênteses, traço e opcional +
const cepRe = /^\d{5}-?\d{3}$/; // formato brasileiro 00000-000 ou 00000000

function clearFieldError(field){
  const id = field.getAttribute('aria-describedby');
  if(id){
    const el = document.getElementById(id);
    if(el) el.remove();
    field.removeAttribute('aria-describedby');
  }
  field.classList.remove('error');
  field.setAttribute('aria-invalid', 'false');
}

function setFieldError(field, message){
  clearFieldError(field);
  field.classList.add('error');
  field.setAttribute('aria-invalid', 'true');
  const id = `${field.name}-error`;
  const el = document.createElement('div');
  el.className = 'error-message';
  el.id = id;
  el.textContent = message;
  field.insertAdjacentElement('afterend', el);
  field.setAttribute('aria-describedby', id);
}

function validateFieldValue(name, value){
  // retorna mensagem de erro ou null
  if(name === 'nome'){
    if(!value || value.trim().length < 3) return 'Nome é obrigatório (mín. 3 caracteres).';
    return null;
  }
  if(name === 'telefone'){
    if(!value || !phoneRe.test(value)) return 'Telefone inválido. Informe um número válido (ex.: (11) 91234-5678).';
    return null;
  }
  if(name === 'email'){
    if(!value || !emailRe.test(value)) return 'E-mail inválido.';
    return null;
  }
  if(name === 'data_nascimento'){
    if(!value) return 'Data de nascimento é obrigatória.';
    const d = new Date(value);
    if(Number.isNaN(d.getTime())) return 'Data de nascimento inválida.';
    const today = new Date();
    if(d > today) return 'Data de nascimento não pode ser no futuro.';
    // calcular idade aproximada em anos
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if(m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
    if(age < 0 || age > 120) return 'Data de nascimento parece inválida (idade fora do intervalo).';
    return null;
  }
  if(name === 'endereco'){
    if(!value || value.trim().length < 5) return 'Endereço é obrigatório (informe rua e número).';
    return null;
  }
  if(name === 'cep'){
    if(!value) return null; // opcional
    if(!cepRe.test(value)) return 'CEP inválido. Use 00000-000 ou 00000000.';
    return null;
  }
  if(name === 'idade'){
    if(!value) return null;
    const n = Number(value);
    if(Number.isNaN(n) || n < 1 || n > 120) return 'Idade deve ser um número entre 1 e 120.';
    return null;
  }
  if(name === 'mensagem'){
    if(value && value.length > 500) return 'Mensagem muito longa (máx. 500 caracteres).';
    return null;
  }
  return null;
}


function validateFormData(data){
  const errors = {};
  for(const [k,v] of Object.entries(data)){
    const m = validateFieldValue(k, v);
    if(m) errors[k] = m;
  }
  // also check required fields even if not present in data
  if(!('nome' in data)) errors.nome = 'Nome é obrigatório (mín. 3 caracteres).';
  if(!('email' in data)) errors.email = 'E-mail inválido.';
  if(!('telefone' in data)) errors.telefone = 'Telefone é obrigatório.';
  if(!('data_nascimento' in data)) errors.data_nascimento = 'Data de nascimento é obrigatória.';
  if(!('endereco' in data)) errors.endereco = 'Endereço é obrigatório.';
  return errors;
}

export function setupFormBehaviour(){
  const form = document.getElementById('contact-form');
  const alerts = document.getElementById('form-alerts');
  if(!form) return;

  // preencher com dados salvos
  const saved = loadFormData();
  if(saved){
    Object.keys(saved).forEach(k => {
      const f = form.querySelector(`[name="${k}"]`);
      if(f) f.value = saved[k];
    });
  }

  // validação em tempo real: input/blur
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', (e) => {
      const name = field.name;
      if(!name) return;
      const msg = validateFieldValue(name, field.value);
      if(msg) setFieldError(field, msg);
      else clearFieldError(field);
    });
    field.addEventListener('blur', () => {
      const name = field.name;
      if(!name) return;
      const msg = validateFieldValue(name, field.value);
      if(msg) setFieldError(field, msg);
      else clearFieldError(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alerts.innerHTML = '';
    const fd = new FormData(form);
    const data = {};
    for(const [k,v] of fd.entries()) data[k] = v;

    const errors = validateFormData(data);
    // clear previous field errors
    form.querySelectorAll('input, textarea').forEach(f => clearFieldError(f));

    if(Object.keys(errors).length){
      // show inline errors and a summary alert
      for(const [name, msg] of Object.entries(errors)){
        const field = form.querySelector(`[name="${name}"]`);
        if(field) setFieldError(field, msg);
      }

      const list = Object.entries(errors).map(([k,m]) => `<li><strong>${k}</strong>: ${m}</li>`).join('');
      alerts.innerHTML = `<div class="alert" role="alert">Há problemas no formulário. Corrija antes de enviar.<ul style="margin:.5rem 0 0 1rem">${list}</ul></div>`;

      // focus no primeiro campo com erro
      const first = form.querySelector('.error');
      if(first) first.focus();
      return;
    }

    // sucesso: salvar no localStorage e mostrar mensagem
    saveFormData(data);
    alerts.innerHTML = '<div class="alert" style="background:#effff3;border-color:#d0f2cc;color:#21603a" role="status">Dados salvos com sucesso no localStorage.</div>';
    // limpar erros visuais
    form.querySelectorAll('.error').forEach(n => n.classList.remove('error'));
    form.querySelectorAll('.error-message').forEach(n => n.remove());
  });

  const resetBtn = document.getElementById('reset-btn');
  if(resetBtn) resetBtn.addEventListener('click', () => {
    form.reset();
    alerts.innerHTML = '';
    form.querySelectorAll('input, textarea').forEach(f => clearFieldError(f));
    localStorage.removeItem('contactForm');
  });
}
