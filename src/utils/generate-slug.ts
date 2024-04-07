export function generateSlug(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}


// Normalização -> "é" -> "e´"
// replace(/[\u0300-\u036f]/g, "") -> substitui caracteres especiais por uma string vazia
// toLowerCase() -> Transforma tudo em minusculo
// replace(/[^\w\s-]/g, "") -> remove qualquer caracter que não é letra, digíto, espaço em branco ou hífen
// replace(/\s+/g, "-") -> substritui espaços em branco por hífens