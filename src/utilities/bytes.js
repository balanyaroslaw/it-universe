export async function fileToBytes(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      resolve(new Uint8Array(arrayBuffer));
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function bytesToBase64(bytes) {
  const binary = String.fromCharCode(...bytes);
  return btoa(binary);
}