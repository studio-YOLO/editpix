# EditPix
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Test on Main](https://github.com/studio-YOLO/editpix/actions/workflows/main.yml/badge.svg)](https://github.com/studio-YOLO/editpix/actions/workflows/main.yml)

A powerful and versatile image editing library for the browser.

![key1](Assets/logo.png)

## Basic Editing:

Adjust brightness, contrast, saturation, and other image parameters.
Apply filters and effects for creative transformations.

## Features:

- edit directly within the browser, without the need for node
- easy to use functions that do exactly what you'd expect from them

**Currently implemented features:**
- colorspace transforms:
    - RGB
    - HSL
    - Hex
- color filters:
    - black and white
    - grayscale
    - sepia
- color adjustments:
    - saturation
    - temperature
    - tint
- value adjustments:
    - brightness
    - contrast
    - exposure
    - opacity
- other tools:
    - extract color palette


### Supported Formats:

Handles common image formats (JPEG, PNG, GIF, etc.)

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

## Contributing

We welcome contributions! Please follow our Code of Conduct.

## License

This library is provided under the MIT license.