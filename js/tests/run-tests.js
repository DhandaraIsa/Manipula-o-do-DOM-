import { compile } from '../templates.js';

function assertEq(actual, expected, msg){
  if(actual === expected){
    console.log(`PASS: ${msg}`);
    return true;
  }
  console.error(`FAIL: ${msg}`);
  console.error('  expected:', JSON.stringify(expected));
  console.error('  actual:  ', JSON.stringify(actual));
  process.exitCode = 1;
  return false;
}

function run(){
  let ok = true;
  ok = assertEq(compile('Hello {{name}}', {name: 'World'}), 'Hello World', 'substitui {{name}}') && ok;
  ok = assertEq(compile('x{{a.b}}y', {a: {b: 2}}), 'x2y', 'suporta navegação com .') && ok;
  ok = assertEq(compile('sem chave', {}), 'sem chave', 'template sem chaves permanece') && ok;
  if(ok) console.log('\nTodos os testes passaram.');
  else console.error('\nAlguns testes falharam.');
}

run();
