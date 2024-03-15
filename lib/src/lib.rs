extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
use rand::prelude::*;

#[inline]
fn euclidean_distance(color1: &[u8; 3], color2: &[u8; 3]) -> f64 {
    f64::sqrt(
        (color1[0] as f64 - color2[0] as f64).powi(2) +
        (color1[1] as f64 - color2[1] as f64).powi(2) +
        (color1[2] as f64 - color2[2] as f64).powi(2)
    )
}

#[inline(always)]
fn initialize_centroids(colors: &[[u8; 3]], color_number: usize) -> Vec<[u8; 3]> {
    let mut centroids: Vec<[u8; 3]> = Vec::new();

    for i in 0..color_number {
        centroids.push(colors[i * colors.len() / color_number])
    }

    centroids
}

fn assign_to_centroids(colors: &[[u8; 3]], centroids: Vec<[u8; 3]>) -> Vec<usize> {
    let mut assignments: Vec<usize> = Vec::new();
    for i in 0..colors.len() {
        let mut min_distance = f64::INFINITY;
        let mut closest_centroid = 3;
        for j in 0..centroids.len() {
            let distance = euclidean_distance(colors.get(i).unwrap(), centroids.get(j).unwrap());
            if distance < min_distance {
                min_distance = distance;
                closest_centroid = j;
            }
        }
        assignments.push(closest_centroid);
    }
    
    assignments
}


fn calculate_new_centroids(colors: &[[u8; 3]], assignments: &[usize], color_number: usize) -> Vec<[u8; 3]> {
    let mut new_centroids: Vec<[u32; 3]> = vec![[0,0,0]; color_number];   
    let mut counts = vec![0; color_number];
    

    for i in 0..colors.len() {
        let assignment = assignments[i];
        new_centroids[assignment][0] += colors[i][0] as u32;
        new_centroids[assignment][1] += colors[i][1] as u32;
        new_centroids[assignment][2] += colors[i][2] as u32;
        counts[assignment]+=1;
    }

    for  j in  0..color_number  {
        if counts[j] > 0 {
          new_centroids[j][0] /= counts[j];
          new_centroids[j][1] /= counts[j];
          new_centroids[j][2] /= counts[j];
        }
    }

    let vec_u8: Vec<[u8; 3]> = new_centroids
        .iter()
        .map(|&arr| [arr[0] as u8, arr[1] as u8, arr[2] as u8])
        .collect();
    
    vec_u8
    
}

#[wasm_bindgen]
pub fn k_means(colors_r: Vec<u8>, color_number: usize, max_iterations: usize) -> Vec<u8> {
    let colors: Vec<[u8; 3]> = colors_r
        .chunks_exact(3) // Get chunks of 3 elements
        .map(|chunk| {
            let mut array: [u8; 3] = [0; 3];
            array.copy_from_slice(chunk);
            array
        })
        .collect();

    
    let mut centroids = initialize_centroids(&colors, color_number);
    
    let mut iterations: usize = 0;
    let mut previous_assignments;
    let mut assignments: Vec<usize> = Vec::new();
  
    loop {
        previous_assignments = assignments.clone();
        assignments = assign_to_centroids(&colors, centroids);
        centroids = calculate_new_centroids(&colors, &assignments, color_number);
        iterations += 1;
        if !(iterations < max_iterations && assignments != previous_assignments) {
            break;
        }
    }
    
    let serialized_vector: Vec<u8> = centroids
        .into_iter()
        .flat_map(|array| array.into_iter())
        .collect();

    serialized_vector
}

fn square_distance(color1: &[u8; 3], color2: &[u8; 3]) -> f64 {
    (color1[0] as f64 - color2[0] as f64).powi(2) +
    (color1[1] as f64 - color2[1] as f64).powi(2) +
    (color1[2] as f64 - color2[2] as f64).powi(2)
}

fn initialize_centroids_pp(colors: &Vec<[u8; 3]>, color_number: usize) -> Vec<[u8; 3]> {
    let mut rng = thread_rng();
    let mut centroids: Vec<[u8; 3]>  = Vec::new();
    let first_centroid = colors[rng.gen_range(0..colors.len())];
    centroids.push(first_centroid);
    
    for _i in 1..color_number {
        let distances = colors.iter().map(|x| {
            let partial_distances = centroids.iter().map(|y| square_distance(x, y));
            partial_distances.fold(f64::INFINITY, |a, b| a.min(b))
        });
        let total_weight = distances.clone().fold(0.0, |a, b| a + b);
        let distances: Vec<_> = distances.collect();
        let target = rng.gen::<f64>() * total_weight;
        let mut cumulative = 0.0;
        for i in 0..colors.len() {
            cumulative += distances[i];
            if cumulative >= target {
                centroids.push(colors[i]);
                break;
            }
        }
    }

    centroids
}

fn assign_to_centroids_pp(colors: &[[u8; 3]], centroids: Vec<[u8; 3]>) -> Vec<usize> {
    let mut assignments: Vec<usize> = Vec::new();
    for i in 0..colors.len() {
        let mut min_distance = f64::INFINITY;
        let mut closest_centroid = 0;
        for j in 0..centroids.len() {
            let distance = square_distance(colors.get(i).unwrap(), centroids.get(j).unwrap());
            if distance < min_distance {
                min_distance = distance;
                closest_centroid = j;
            }
        }
        assignments.push(closest_centroid);
    }
    
    assignments
}

#[wasm_bindgen]
pub fn k_means_pp(colors_r: Vec<u8>, color_number: usize, max_iterations: usize) -> Vec<u8> {
    let colors: Vec<[u8; 3]> = colors_r
        .chunks_exact(3) // Get chunks of 3 elements
        .map(|chunk| {
            let mut array: [u8; 3] = [0; 3];
            array.copy_from_slice(chunk);
            array
        })
        .collect();

    
    let mut centroids = initialize_centroids_pp(&colors, color_number);
    
    let mut iterations: usize = 0;
    let mut previous_assignments;
    let mut assignments: Vec<usize> = Vec::new();
  
    loop {
        previous_assignments = assignments;
        assignments = assign_to_centroids_pp(&colors, centroids);
        centroids = calculate_new_centroids(&colors, &assignments, color_number);
        iterations += 1;
        if iterations > max_iterations || assignments == previous_assignments {
            break;
        }
    }
    
    let serialized_vector: Vec<u8> = centroids
        .into_iter()
        .flat_map(|array| array.into_iter())
        .collect();

    serialized_vector
}




// Sort an RGB pixel array by its channel with the highest variance
fn sort_pixels(pixels: &Vec<[u8; 3]>, channel: usize) -> Vec<[u8; 3]> {
    let mut px = pixels.to_owned();
    px.sort_by(|a, b| a[channel].cmp(&b[channel]));
    px
}

// Find the color channel with the highest variance 
fn find_max_channel(pixels: &Vec<[u8; 3]>) -> usize {
    let mut min = [255, 255, 255];
    let mut max = [0, 0, 0];
    for (_i, pixel) in pixels.iter().enumerate() {
        for j in 0..3 {
            if pixel[j] < min[j] {
                min[j] = pixel[j];
            }
            if pixel[j] > max[j] {
                max[j] = pixel[j];
            }
        }
    }
    let mut range = [0, 0, 0];
    for j in 0..3 {
        range[j] = max[j] - min[j];
    }
    let max_channel: usize = (0..3).into_iter().max().unwrap();
    max_channel
}

// Find the average color of an RGB pixel array
fn find_average_color(pixels: Vec<[u8; 3]>) -> [u8; 3] {
    let mut sum: [f32; 3] = [0.0, 0.0, 0.0];
    for pixel in &pixels {
        for j in 0..3 {
            sum[j] += pixel[j] as f32;
        }
    }
    let avg: [u8; 3] = [(sum[0] / pixels.len() as f32) as u8, (sum[1] / pixels.len() as f32) as u8, (sum[2] / pixels.len() as f32) as u8];
    avg
}

// Apply the median cut algorithm to an RGB pixel array and return a downsized color palette
#[wasm_bindgen]
pub fn median_cut(pixels_r: Vec<u8>, palette_size: usize) -> Vec<u8> {
    // Turn the linear array into an array of RGB arrays
    let pixels: Vec<[u8; 3]> = pixels_r
        .chunks_exact(3) // Get chunks of 3 elements
        .map(|chunk| {
            let mut array: [u8; 3] = [0; 3];
            array.copy_from_slice(chunk);
            array
        })
        .collect();

    // Initialize a queue of regions with all pixels
    let mut queue = vec![pixels];
    // Repeat the following loop until the queue reaches the correct size
    while queue.len() < palette_size {
        // Extract the region with the most pixels from the queue
        let mut max_index = 0;
        let mut max_size = 0;
        for (i, region) in queue.iter().enumerate() {
            if region.len() > max_size {
                max_size = region.len();
                max_index = i;
            }
        }
        let region = queue.remove(max_index);
        // Find the channel with the highest variance within the region
        let channel = find_max_channel(&region);
        // Sort the pixels in the region by that channel
        let sorted: Vec<[u8; 3]> = sort_pixels(&region, channel).iter().cloned().collect();
        // Find the average and bisect the region
        let median = sorted.len() / 2;
        let left = &sorted[..median];
        let right = &sorted[median..];
        // Add the two regions to the queue
        queue.push(left.to_vec());
        queue.push(right.to_vec());
    }
    // Compute the average color of each region and return the palette
    let mut palette: Vec<[u8; 3]> = Vec::new();
    for region in queue {
        let color = find_average_color(region);
        palette.push(color);
    }
   
   // Serialize the array of arrays to get a linear array
    let serialized_vector: Vec<u8> = palette
        .into_iter()
        .flat_map(|array| array.into_iter())
        .collect();

    serialized_vector
}

