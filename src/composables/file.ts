export function useFile() {
  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: Event) => {
        const target = e.target as FileReader;

        resolve(target.result as string);
      };
      reader.onerror = (e) => {
        reject(e);
      };
      reader.readAsDataURL(file);
    });
  };
  const fetchImageAsFile = (url: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.startsWith("image")) {
          throw new Error("URL does not point to an image file");
        }
        const blob = await response.blob();
        const file = new File([blob], "image.png", { type: blob.type });
        const reader = new FileReader();
        reader.onload = (e: Event) => {
          const target = e.target as FileReader;
          resolve(target.result as string);
        };
        reader.onerror = (e) => {
          reject(e);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    readFile,
    fetchImageAsFile,
  };
}
