function euclideanDistance(color1, color2) {
    return Math.sqrt(
        Math.pow(color1[0] - color2[0], 2) +
        Math.pow(color1[1] - color2[1], 2) +
        Math.pow(color1[2] - color2[2], 2)
    );
}

function initializeCentroids(colors, k) {
    const centroids = [];
    const indices = [];
    for (let i = 0; i < k; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * colors.length);
        } while (indices.includes(index));
        indices.push(index);
        centroids.push(colors[index]);
    }
    return centroids;
}

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

function calculateNewCentroids(colors, assignments, k) {
    const newCentroids = Array.from({ length: k }, () => [0, 0, 0]);
    const counts = Array.from({ length: k }, () => 0);

    for (let i = 0; i < colors.length; i++) {
        const assignment = assignments[i];
        newCentroids[assignment][0] += colors[i][0];
        newCentroids[assignment][1] += colors[i][1];
        newCentroids[assignment][2] += colors[i][2];
        counts[assignment]++;
    }

    for (let j = 0; j < k; j++) {
        if (counts[j] > 0) {
            newCentroids[j][0] = Math.round(newCentroids[j][0] / counts[j]);
            newCentroids[j][1] = Math.round(newCentroids[j][1] / counts[j]);
            newCentroids[j][2] = Math.round(newCentroids[j][2] / counts[j]);
        }
    }

    return newCentroids;
}

function kMeans(colors, k, maxIterations = 100) {
    let centroids = initializeCentroids(colors, k);
    let iterations = 0;
    let previousAssignments;
    let assignments;

    do {
        previousAssignments = assignments;
        assignments = assignToCentroids(colors, centroids);
        centroids = calculateNewCentroids(colors, assignments, k);
        iterations++;
    } while (
        iterations < maxIterations &&
        JSON.stringify(assignments) !== JSON.stringify(previousAssignments)
    );

    return Array.from(new Set(assignments.map((centroidIndex) => centroids[centroidIndex])));
}

export default kMeans;