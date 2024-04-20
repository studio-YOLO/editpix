# EditPix
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Test on Main](https://github.com/studio-YOLO/editpix/actions/workflows/main.yml/badge.svg)](https://github.com/studio-YOLO/editpix/actions/workflows/main.yml)

A powerful and versatile image editing library for the browser.

## Basic Editing

Adjust brightness, contrast, saturation, and other image parameters.
Apply filters and effects for creative transformations.

## Features

- edit directly within the browser, without the need for Node
- easy to use functions that do exactly what you'd expect from them

**Currently implemented features:**
- colorspace transforms:
    - RGB
    - HSL
    - HEX
    - higher contrast
- color filters:
    - black and white
    - grayscale
    - sepia
- color adjustments:
    - saturation
    - temperature
    - tint
- image resizing
- value adjustments:
    - brightness
    - contrast
    - exposure
    - opacity
    - shadows
    - highlights
    - sharpness
- other tools:
    - extract color palette
    - extract dominant color

## Project structure
+ `demo/` - collection of demo scripts of all features.
+ `lib/` - rust code for functions in wasm.
+ `src/core/` - all the functions for image editing.
+ `src/editpix.js` - main class of the library where all the functionality is grouped.
+ `src/image-manager.js` - image-related functions such as resizing or image-to-pixelArray conversion.
+ `src/utils.js` - utility functions shared between features.
+ `test/` - Node unit tests using Jest.


## Basic Usage

Short tutorial on loading an image, performing simple edits, and saving.
Examples:

```javascript
import EditPix from "./src/editpix.js";

const editpix = new EditPix();

// image url
const url = "images/img.jpg";

// create image
var image = new Image();
image.src = url;

// waiting image load
image.onload = () => {
    // convert image to gray scale
    editpix.toGrayScale(image)
        .then(grayScaledImage => {
            // render original image
            document.body.appendChild(image);
            // render modified image
            document.body.appendChild(grayScaledImage);
        })
        .catch(error => { console.log(error) })
};
```

## Contributing

We welcome contributions! Please follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Contributors
[![Contributors](https://contrib.rocks/image?repo=studio-YOLO/editpix)](https://github.com/studio-YOLO/editpix/graphs/contributors)

## Authors
- [DPende](https://github.com/DPende)
- [VinciGit00](https://github.com/VinciGit00)
- [f-aguzzi](https://github.com/f-aguzzi)

## License

This library is provided under the [MIT license](LICENSE).