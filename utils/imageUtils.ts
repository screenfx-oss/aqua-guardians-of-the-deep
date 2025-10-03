
export const fileToBase64 = (file: File): Promise<{ base64Data: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const [header, base64Data] = result.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1] || file.type;
      
      if (!base64Data || !mimeType) {
        reject(new Error("Failed to parse file data."));
        return;
      }
      resolve({ base64Data, mimeType });
    };
    reader.onerror = (error) => reject(error);
  });
};
