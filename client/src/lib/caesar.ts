export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function caesarCipher(text: string, shift: number, decrypt: boolean = false): string {
  const s = decrypt ? (26 - (shift % 26)) : (shift % 26);
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      const index = ALPHABET.indexOf(char);
      if (index === -1) return char; // Keep non-alphabet characters as is
      return ALPHABET[(index + s) % 26];
    })
    .join("");
}

export function vigenereCipher(text: string, key: string, decrypt: boolean = false): string {
  if (!key) return text;
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");
  if (cleanKey.length === 0) return text;

  let keyIndex = 0;
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      const charIndex = ALPHABET.indexOf(char);
      if (charIndex === -1) return char;

      const shift = ALPHABET.indexOf(cleanKey[keyIndex % cleanKey.length]);
      keyIndex++;

      const s = decrypt ? (26 - (shift % 26)) : (shift % 26);
      return ALPHABET[(charIndex + s) % 26];
    })
    .join("");
}
