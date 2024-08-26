export function translateToBionic(text) {
  // Usamos una expresión regular para reemplazar los saltos de línea por <br> y aplicar formato
  return text
    .replace(/(\r\n|\n|\r)/g, '<br>') // Reemplazamos los saltos de línea por <br>
    .split(' ')
    .map(word => {
      // Aplicamos formato a la palabra dividiéndola en dos partes
      const midpoint = Math.floor(word.length / 2);
      return `<b>${word.slice(0, midpoint)}</b>${word.slice(midpoint)}`;
    })
    .join(' '); // Unimos las palabras de vuelta con espacios
}

