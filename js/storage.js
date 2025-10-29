const KEY = 'contactForm';

export function saveFormData(data){
  try{
    localStorage.setItem(KEY, JSON.stringify(data));
  }catch(e){
    console.warn('Não foi possível salvar no localStorage', e);
  }
}

export function loadFormData(){
  try{
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  }catch(e){
    return null;
  }
}
