const gaussianKernelSize = 5;
const gaussianSigma = 1.4;
const highThresholdRatio = 0.2; 
const lowThresholdRatio = 0.1; 

function cannyEdgeDetection(imageData) {
    const grayImageData = convertToGray(imageData);

    const smoothedImageData = gaussianBlur(grayImageData);

    const { gradients, orientations } = computeGradients(smoothedImageData);

    const suppressedGradients = nonMaxSuppression(gradients, orientations);

    const thresholdedImageData = applyHysteresisThreshold(suppressedGradients);

    return thresholdedImageData;
}

function convertToGray(imageData) {
    const grayImageData = new ImageData(imageData.width, imageData.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b; 
        grayImageData.data[i] = gray;
        grayImageData.data[i + 1] = gray;
        grayImageData.data[i + 2] = gray;
        grayImageData.data[i + 3] = 255; 
    }
    return grayImageData;
}

function gaussianBlur(imageData) {
    const kernel = generateGaussianKernel(gaussianKernelSize, gaussianSigma);
    const smoothedImageData = convolve(imageData, kernel);
    return smoothedImageData;
}

function generateGaussianKernel(size, sigma) {
    const kernel = [];
    const center = Math.floor(size / 2);
    let sum = 0;
    for (let i = 0; i < size; i++) {
        kernel[i] = [];
        for (let j = 0; j < size; j++) {
            const distance = (i - center) ** 2 + (j - center) ** 2;
            kernel[i][j] = Math.exp(-distance / (2 * sigma ** 2)) / (2 * Math.PI * sigma ** 2);
            sum += kernel[i][j];
        }
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            kernel[i][j] /= sum;
        }
    }
    return kernel;
}

function convolve(imageData, kernel) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const outputData = new Uint8ClampedArray(data.length);

    const kernelSize = kernel.length;
    const radius = Math.floor(kernelSize / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let sumR = 0;
            let sumG = 0;
            let sumB = 0;
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    const pixelX = Math.min(width - 1, Math.max(0, x + j));
                    const pixelY = Math.min(height - 1, Math.max(0, y + i));
                    const pixelIndex = (pixelY * width + pixelX) * 4;
                    const weight = kernel[i + radius][j + radius];
                    sumR += data[pixelIndex] * weight;
                    sumG += data[pixelIndex + 1] * weight;
                    sumB += data[pixelIndex + 2] * weight;
                }
            }
            const outputIndex = (y * width + x) * 4;
            outputData[outputIndex] = sumR;
            outputData[outputIndex + 1] = sumG;
            outputData[outputIndex + 2] = sumB;
            outputData[outputIndex + 3] = 255; 
        }
    }
    return new ImageData(outputData, width, height);
}

function computeGradients(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;

    const gradients = new Array(width * height).fill(0);
    const orientations = new Array(width * height).fill(0);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const pixelIndex = y * width + x;
            const gx = (
                -data[(y - 1) * width * 4 + (x - 1)] +
                data[(y - 1) * width * 4 + (x + 1)] -
                2 * data[y * width * 4 + (x - 1)] +
                2 * data[y * width * 4 + (x + 1)] -
                data[(y + 1) * width * 4 + (x - 1)] +
                data[(y + 1) * width * 4 + (x + 1)]
            ) / 4;

            const gy = (
                -data[(y - 1) * width * 4 + (x - 1)] -
                2 * data[(y - 1) * width * 4 + x] -
                data[(y - 1) * width * 4 + (x + 1)] +
                data[(y + 1) * width * 4 + (x - 1)] +
                2 * data[(y + 1) * width * 4 + x] +
                data[(y + 1) * width * 4 + (x + 1)]
            ) / 4;

            gradients[pixelIndex] = Math.sqrt(gx * gx + gy * gy);
            orientations[pixelIndex] = Math.atan2(gy, gx);
        }
    }

    return { gradients, orientations };
}

function nonMaxSuppression(gradients, orientations, width, height) {
    const suppressedGradients = [...gradients];
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const pixelIndex = y * width + x;
            const angle = orientations[pixelIndex];
            let neighbor1, neighbor2;

            // Determina i pixel vicini lungo l'orientazione
            if ((angle >= -Math.PI / 8 && angle < Math.PI / 8) || (angle >= 7 * Math.PI / 8 && angle < -7 * Math.PI / 8)) {
                neighbor1 = gradients[pixelIndex - 1];
                neighbor2 = gradients[pixelIndex + 1];
            } else if ((angle >= Math.PI / 8 && angle < 3 * Math.PI / 8) || (angle >= -7 * Math.PI / 8 && angle < -5 * Math.PI / 8)) {
                neighbor1 = gradients[(y - 1) * width + (x - 1)];
                neighbor2 = gradients[(y + 1) * width + (x + 1)];
            } else if ((angle >= 3 * Math.PI / 8 && angle < 5 * Math.PI / 8) || (angle >= -5 * Math.PI / 8 && angle < -3 * Math.PI / 8)) {
                neighbor1 = gradients[(y - 1) * width + x];
                neighbor2 = gradients[(y + 1) * width + x];
            } else {
                neighbor1 = gradients[(y - 1) * width + (x + 1)];
                neighbor2 = gradients[(y + 1) * width + (x - 1)];
            }

            if (gradients[pixelIndex] < neighbor1 || gradients[pixelIndex] < neighbor2) {
                suppressedGradients[pixelIndex] = 0;
            }
        }
    }

    return suppressedGradients;
}

function applyHysteresisThreshold(gradients, width, height) {
    const highThreshold = Math.max(...gradients) * highThresholdRatio;
    const lowThreshold = highThreshold * lowThresholdRatio;

    const edgeImageData = new Uint8ClampedArray(width * height).fill(0);

    const isEdge = (x, y) => x >= 0 && y >= 0 && x < width && y < height && edgeImageData[y * width + x] === 0;

    const traverseEdge = (x, y) => {
        if (!isEdge(x, y)) return;
        edgeImageData[y * width + x] = 255;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if ((dx !== 0 || dy !== 0) && isEdge(x + dx, y + dy)) {
                    traverseEdge(x + dx, y + dy);
                }
            }
        }
    };

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelIndex = y * width + x;
            if (gradients[pixelIndex] >= highThreshold) {
                edgeImageData[pixelIndex] = 255;
                traverseEdge(x, y);
            } else if (gradients[pixelIndex] >= lowThreshold) {
                edgeImageData[pixelIndex] = 128;
            }
        }
    }

    return edgeImageData;
}

// Funzione principale per ottenere l'immagine dei bordi
function getEdgeImage(imageData) {
    const edgeImageData = cannyEdgeDetection(imageData);
    return edgeImageData;
}

