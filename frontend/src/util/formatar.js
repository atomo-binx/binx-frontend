function formatarCNPJ(cnpj) {
  if (cnpj) return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  return "";
}

function formatarTelefone(telefone) {
  if (!telefone) return "";

  // Telefone 0800
  if (telefone.slice(0, 4) === "0800") {
    const a = telefone.slice(0, 4);
    const b = telefone.slice(4, 7);
    const c = telefone.slice(7, 11);

    return `${a} ${b} ${c}`;
  }

  // Telefone com DD
  if (telefone.length == 10) {
    const a = telefone.slice(0, 2);
    const b = telefone.slice(2, 6);
    const c = telefone.slice(6, 10);

    return `(${a}) ${b}-${c}`;
  }

  // Celular com DDD
  if (telefone.length === 11) {
    const a = telefone.slice(0, 2);
    const b = telefone.slice(2, 7);
    const c = telefone.slice(7, 11);

    return `(${a}) ${b}-${c}`;
  }

  return telefone;
}

export { formatarTelefone, formatarCNPJ };
