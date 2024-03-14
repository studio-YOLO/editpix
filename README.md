# EditPix
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Test on Main](https://github.com/studio-YOLO/editpix/actions/workflows/main.yml/badge.svg)](https://github.com/studio-YOLO/editpix/actions/workflows/main.yml)

A powerful and versatile image editor for [insert your target audience/users].

## Features

### Basic Editing:

Crop, resize, and rotate images with precision.
Adjust brightness, contrast, saturation, and other image parameters.
Apply filters and effects for creative transformations.
Advanced Tools:

[List advanced features if applicable - e.g., layer-based editing, masking, retouching tools]
Intuitive Interface:

User-friendly UI designed for ease of use.
Supported Formats:

Handles common image formats (JPEG, PNG, GIF, etc.)
[Include support for RAW formats or other less common ones if applicable]
Installation

### Basic Usage:

Short tutorial on loading an image, performing simple edits, and saving.
Examples:

```javascript
import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img1.jpg";

var image = new Image();
image.src = url;

//waiting image load
image.onload = () => {

    // convert image to gray scale
    editpix.toGrayScale(image)
        .then(grayScaledImage => {
            document.body.appendChild(image);
            document.body.appendChild(grayScaledImage);
        })
        .catch(error => { console.log(error) })
};
```
Use cases demonstrating core features.
## Contributing

We welcome contributions! Please follow these guidelines:


The license is MIT
Additional Notes
