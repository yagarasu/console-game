export function rotFormattedTextLength(string) {
  return string.replace(/%c\{[^\}]*\}/gi, '').length;
}