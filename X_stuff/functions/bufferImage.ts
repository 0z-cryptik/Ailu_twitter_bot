export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  const binary = bytes.reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    ""
  );
  return btoa(binary);
};
