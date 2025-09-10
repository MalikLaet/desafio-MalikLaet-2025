const BRINQUEDOS_VALIDOS = [
  "RATO",
  "BOLA",
  "LASER",
  "CAIXA",
  "NOVELO",
  "SKATE",
];

const ANIMAIS = {
  Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
  Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
  Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
  Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
  Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
  Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
  Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
};

class AbrigoAnimais {
  pessoaTemBrinquedosNecessarios(
    brinquedosPessoa,
    brinquedosNecessarios,
    ignorarOrdem = false
  ) {
    if (ignorarOrdem) {
      return brinquedosNecessarios.every((b) => brinquedosPessoa.includes(b));
    }

    let indice = 0;
    for (const brinquedo of brinquedosPessoa) {
      if (brinquedo === brinquedosNecessarios[indice]) {
        indice++;
      }
      if (indice === brinquedosNecessarios.length) return true;
    }
    return false;
  }

  validaBrinquedos(brinquedos) {
    const brinquedosUnicos = new Set(brinquedos);
    if (brinquedosUnicos.size !== brinquedos.length) return false;
    return brinquedos.every((b) => BRINQUEDOS_VALIDOS.includes(b));
  }

  gatosCompartilhamBrinquedos(animaisDaPessoa) {
    const brinquedosUsados = new Set();

    for (const nome of animaisDaPessoa) {
      const { tipo, brinquedos } = ANIMAIS[nome];
      if (tipo === "gato") {
        for (const brinquedo of brinquedos) {
          if (brinquedosUsados.has(brinquedo)) return true;
          brinquedosUsados.add(brinquedo);
        }
      }
    }
    return false;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, listaAnimais) {
    const pessoa1 = brinquedosPessoa1.split(",").map((b) => b.trim());
    const pessoa2 = brinquedosPessoa2.split(",").map((b) => b.trim());
    const ordemAnimais = listaAnimais.split(",").map((a) => a.trim());

    const animaisUnicos = new Set(ordemAnimais);
    if (
      animaisUnicos.size !== ordemAnimais.length ||
      ordemAnimais.some((a) => !ANIMAIS[a])
    ) {
      return { erro: "Animal inválido", lista: undefined };
    }

    if (!this.validaBrinquedos(pessoa1) || !this.validaBrinquedos(pessoa2)) {
      return { erro: 'Brinquedo inválido', lista: undefined };
    }

    const atribuicoes = [];
    const animaisPorPessoa = { pessoa1: [], pessoa2: [] };
    let erro = undefined;

    for (const nome of ordemAnimais) {
      const { brinquedos } = ANIMAIS[nome];
      const ignorarOrdem = nome === "Loco";

      const podeP1 = this.pessoaTemBrinquedosNecessarios(
        pessoa1,
        brinquedos,
        ignorarOrdem
      );
      const podeP2 = this.pessoaTemBrinquedosNecessarios(
        pessoa2,
        brinquedos,
        ignorarOrdem
      );

let destino = "abrigo";

if (podeP1 && !podeP2) {
  const tentativa = [...animaisPorPessoa.pessoa1, nome];
  if (this.gatosCompartilhamBrinquedos(tentativa)) {
    return { erro: "Brinquedo inválido", lista: undefined };
  }
  if (animaisPorPessoa.pessoa1.length >= 3) {
    return { erro: 'Limite excedido', lista: undefined };
  }
  destino = "pessoa 1";
  animaisPorPessoa.pessoa1.push(nome);

} else if (podeP2 && !podeP1) {
  const tentativa = [...animaisPorPessoa.pessoa2, nome];
  if (this.gatosCompartilhamBrinquedos(tentativa)) {
    return { erro: 'Brinquedo inválido', lista: undefined };
  }
  if (animaisPorPessoa.pessoa2.length >= 3) { 
    return { erro: 'Limite excedido', lista: undefined };
  }
  destino = "pessoa 2";
  animaisPorPessoa.pessoa2.push(nome);

} else if (podeP1 && podeP2) {
  destino = "abrigo"; // empate
}

atribuicoes.push({ animal: nome, destino });

    }

    // Loco não pode ficar sozinho
    atribuicoes.forEach((item) => {
      if (item.animal === "Loco" && item.destino.startsWith("pessoa")) {
        const pessoa = item.destino === "pessoa 1" ? "pessoa1" : "pessoa2";
        if (animaisPorPessoa[pessoa].length === 1) {
          item.destino = "abrigo";
        }
      }
    });

    const listaFinal = atribuicoes
      .map((item) => `${item.animal} - ${item.destino}`)
      .sort((a, b) => a.localeCompare(b));

    if (erro) return { erro, lista: undefined };
    return { erro: undefined, lista: listaFinal };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
