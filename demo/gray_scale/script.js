import EditPix from '../../src/editpix.js';

const editpix = new EditPix();

const imagesUrl = [
  '../images/img3.jpeg'
];

// load images
const originalImages = [];
imagesUrl.forEach(url => {
  const tmpImage = new Image();
  tmpImage.src = url;
  originalImages.push(tmpImage);
});

// convert to gray scale
originalImages.forEach(image => {
  image.addEventListener('load', () => {
    const grayScaledImage = editpix.toGrayScale(image);
    const blackWhiteImage = editpix.toBackWhite(image);
    const resizedImageQuality = editpix.resizeByQuality(image, 5);
    const resizedImageWidth = editpix.resizeByWidth(image, 100);
    const resizeImageHeight = editpix.resizeByHeight(image, 100);
    console.log(editpix.getColorPalette(image, 10, 1));
    grayScaledImage.addEventListener('load', () => {
      const froGSToRgb = editpix.fromGrayScaleToRgb(grayScaledImage);
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.flexDirection = 'row';
      container.appendChild(image);
      container.appendChild(grayScaledImage);
      container.appendChild(blackWhiteImage);
      container.appendChild(froGSToRgb);
      container.appendChild(resizedImageQuality);
      container.appendChild(resizedImageWidth);
      container.appendChild(resizeImageHeight);
      document.body.appendChild(container);
    });
  });
});
