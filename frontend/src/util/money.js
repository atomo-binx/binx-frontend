import currency from "currency.js";

// Cria um objeto curreny a partir de um valor com a precisão desejada
function ajustPrecision(value, precision) {
  return currency(value, { precision });
}

// Função para formatar um valor, inteiro ou float, numérico ou string em moeda BRL
function BRLString(valor, simbolo = "") {
  let formatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(valor);

  if (simbolo != "") {
    return formatado.replace(/\s/g, "").replace("R$", simbolo);
  } else {
    return formatado.replace("R$", "").replace(/\s/g, "");
  }
}

export { ajustPrecision, BRLString };
