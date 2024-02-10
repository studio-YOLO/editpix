import convert_to_gray_scale from "../../src/convert_to_gray_scale.js";

// Funzione per caricare e visualizzare le immagini in scala di grigi
function loadGrayScaleImages() {
  // Array contenente i percorsi delle immagini
  const imagePaths = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpeg",
    "images/img4.webp",
  ];

  // Loop attraverso le immagini e carica le versioni in scala di grigi
  imagePaths.forEach((path, index) => {
    // Creazione di un nuovo elemento immagine
    const img = document.createElement("img");
    img.src = path;

    // Quando l'immagine è caricata, viene eseguita la conversione in scala di grigi
    img.onload = () => {
      // Creazione di un canvas per estrarre i dati dell'immagine
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Estrazione dei dati dell'immagine in formato RGBA
      const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      const rgbArray = [];
      for (let i = 0; i < imageData.length; i += 4) {
        rgbArray.push([imageData[i], imageData[i + 1], imageData[i + 2]]);
      }

      // Conversione in scala di grigi utilizzando la funzione
      const grayScaleArray = convert_to_gray_scale(rgbArray);

      // Creazione di un nuovo canvas per visualizzare l'immagine in scala di grigi
      const grayCanvas = document.createElement("canvas");
      const grayCtx = grayCanvas.getContext("2d");
      grayCanvas.width = img.width;
      grayCanvas.height = img.height;

      // Disegno dell'immagine in scala di grigi sul canvas
      grayScaleArray.forEach((grayValue, i) => {
        const x = i % img.width;
        const y = Math.floor(i / img.width);
        grayCtx.fillStyle = `rgb(${grayValue},${grayValue},${grayValue})`;
        grayCtx.fillRect(x, y, 1, 1);
      });

      // Aggiunta del canvas alla pagina HTML
      document.getElementById(`color${index + 1}`).appendChild(grayCanvas);
    };
  });
}

// Chiamata alla funzione per caricare e visualizzare le immagini in scala di grigi
loadGrayScaleImages();
