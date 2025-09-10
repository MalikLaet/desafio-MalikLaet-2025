import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
});


describe('Abrigo de Animais - testes extras', () => {

  test('Deve impedir que Loco seja adotado sozinho', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'RATO,SKATE', 'Loco'
    );
    expect(resultado.erro).toBeUndefined();
    expect(resultado.lista[0]).toBe('Loco - abrigo');
  });

  test('Gatos não podem dividir brinquedos na mesma pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER,RATO', 'RATO,BOLA,LASER', 'Mimi,Fofo'
    );
    expect(resultado.erro).toBe('Brinquedo inválido'); 
    expect(resultado.lista).toBeUndefined();
  });

  test('Não pode adotar mais de 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,LASER', 
      'RATO,BOLA,CAIXA,NOVELO,LASER', 
      'Rex,Fofo,Bola,Mimi'
    );
    expect(resultado.erro).toBe('Limite excedido');
    expect(resultado.lista).toBeUndefined();
  });

  test('Ambos conseguem adotar → vai para abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,BOLA', 'Rex'
    );
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.erro).toBeUndefined();
  });

  test('Intercalando brinquedos corretamente', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER,RATO', 
      'BOLA,NOVELO,RATO,LASER', 
      'Fofo'
    );
    expect(resultado.lista[0]).toBe('Fofo - pessoa 2'); 
    expect(resultado.erro).toBeUndefined();
  });

});