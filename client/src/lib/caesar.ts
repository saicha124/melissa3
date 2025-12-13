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
