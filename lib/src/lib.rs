extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
extern crate web_sys;

#[inline]
fn euclidean_distance(color1: &[u8; 3], color2: &[u8; 3]) -> f64 {
    f64::sqrt(
        ((color1[0] as i16 - color2[0] as i16) as f64).powi(2) +
        ((color1[1] as i16 - color2[1] as i16) as f64).powi(2) +
        ((color1[2] as i16 - color2[2] as i16) as f64).powi(2)
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