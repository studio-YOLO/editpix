// Funzione per calcolare la distanza euclidea tra due colori
function euclideanDistance(color1, color2) {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
      Math.pow(color1[1] - color2[1], 2) +
      Math.pow(color1[2] - color2[2], 2)
  );
}

// Funzione per inizializzare i centroidi casualmente
function initializeCentroids(colors, colorNumber) {
  const centroids = [];
  const indices = [];
  for (let i = 0; i < colorNumber; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * colors.length);
    } while (indices.includes(index));
    indices.push(index);
    centroids.push(colors[index]);
  }
  return centroids;
}

// Funzione per assegnare i pixel ai centroidi più vicini
function assignToCentroids(colors, centroids) {
  const assignments = [];
  for (let i = 0; i < colors.length; i++) {
    let minDistance = Infinity;
    let closestCentroid = null;
    for (let j = 0; j < centroids.length; j++) {
      const distance = euclideanDistance(colors[i], centroids[j]);
      if (distance < minDistance) {
        minDistance = distance;
        closestCentroid = j;
      }
    }
    assignments.push(closestCentroid);
  }
  return assignments;
}

// Funzione per calcolare i nuovi centroidi
function calculateNewCentroids(colors, assignments, colorNumber) {
  const newCentroids = Array.from({ length: colorNumber }, () => [0, 0, 0]);
  const counts = Array.from({ length: colorNumber }, () => 0);

  for (let i = 0; i < colors.length; i++) {
    const assignment = assignments[i];
    newCentroids[assignment][0] += colors[i][0];
    newCentroids[assignment][1] += colors[i][1];
    newCentroids[assignment][2] += colors[i][2];
    counts[assignment]++;
  }

  for (let j = 0; j < colorNumber; j++) {
    if (counts[j] > 0) {
      newCentroids[j][0] /= counts[j];
      newCentroids[j][1] /= counts[j];
      newCentroids[j][2] /= counts[j];
    }
  }

  return newCentroids;
}

// Funzione per eseguire l'algoritmo K-Means
function kMeans(colors, colorNumber, maxIterations = 100) {
  let centroids = initializeCentroids(colors, colorNumber);
  let iterations = 0;
  let previousAssignments;
  let assignments;

  do {
    previousAssignments = assignments;
    assignments = assignToCentroids(colors, centroids);
    centroids = calculateNewCentroids(colors, assignments, colorNumber);
    iterations++;
  } while (
    iterations < maxIterations &&
    JSON.stringify(assignments) !== JSON.stringify(previousAssignments)
  );

  return assignments.map((centroidIndex) => centroids[centroidIndex]);
}

export default kMeans;