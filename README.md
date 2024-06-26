
<div align="center">

![Image](/assets/editpix-logo.svg)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test on Main](https://github.com/studio-YOLO/editpix/actions/workflows/main.yml/badge.svg)](https://github.com/studio-YOLO/editpix/actions/workflows/main.yml)
[![npm](https://img.shields.io/npm/dm/editpix?logo=npm)](https://www.npmjs.com/package/editpix)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/editpix?logo=jsdeliver)](https://www.jsdelivr.com/package/npm/editpix)

A powerful and versatile image editing library for the browser.

Adjust brightness, contrast, saturation, and other image parameters.
Apply filters and effects for creative transformations.

A complete list of the available features is available [below](#Features).

</div>

---

## Documentation
Please follow the documentation at the [following link](https://studio-yolo.github.io/editpix-doc/).

## Installation

EditPix supports multiple different installation methods.


### Usage in the browser 
For use in the browser the library can be installed via [npm](#installing-from-npm) or loaded via [CDN](#loading-from-a-cdn).


### Installing from `npm` 

```bash
npm i editpix
```

In your HTML file, load the script as a module:

```html
<script type="module" src="example.js"></script>
```

In your JavaScript file, import the library and use it:

```jsx
import EditPix from './node_modules/editpix/src/editpix.js';

const editpix = new Editpix();

// use library
```
### Loading from a CDN

In your HTML file, load the script as a module:

```html
<script type="module" src="example.js"></script>
```

In your JavaScript file, import the library from the CDN and use it:

```jsx
import EditPix from 'https://cdn.jsdelivr.net/npm/editpix/+esm';

const editpix = new Editpix();

// use library
```


You can also choose the version of the library you prefer by specifying it in the URL:

```jsx
import EditPix from 'https://cdn.jsdelivr.net/npm/editpix@[version]/+esm';
```

<br>

### Usage in Vue.js

 Installing from `npm`

```bash
npm i editpix
```

Import and use in your component:

```jsx
<script setup>

import EditPix from "editpix"

const editpix = new EditPix()

//use library

</script>
```

If it is useful to you, at the [following link](https://github.com/studio-YOLO/editpix-vuejs-demo) you can find a small example on how you can use EditPix with Vue.js 3 and the Composition API.


---

## Features

- Edit directly within the browser, without the need for Node
- Easy to use functions, that do exactly what you'd expect from them

**Currently implemented features:**
- Colorspace transforms:
    - RGB (to and from HSL, HEX)
    - HSL (to and from RGB)
    - HEX (to and from RGB)
- Color filters:
    - Black and white
    - Grayscale
    - Sepia
- Color adjustments:
    - Saturation
    - Temperature
    - Tint
- Image resizing:
    - By target width
    - By target height
    - By percentage
- Value adjustments:
    - Brightness
    - Contrast
    - Exposure
    - Opacity
    - Shadows
    - Highlights
    - Sharpness
- Other tools:
    - Extract color palette
    - Extract dominant color

## Project structure
+ `demo/` - a collection of demo scripts of all features.
+ `lib/` - rust code for functions in wasm.
+ `src/core/` - all the functions for image editing.
+ `src/editpix.js` - main class of the library where all the functionality is grouped.
+ `src/image-manager.js` - image-related functions such as resizing and image-to-pixelArray conversion.
+ `src/utils.js` - utility functions shared between features.
+ `test/` - Node unit tests using Jest.


## Basic Usage

Here's a short tutorial / example on loading an image, performing simple edits, and then saving.

```jsx
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

We welcome contributions! Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) and our [Contributing guidelines](CONTRIBUTING.md).

## Contributors
[![Contributors](https://contrib.rocks/image?repo=studio-YOLO/editpix)](https://github.com/studio-YOLO/editpix/graphs/contributors)

## Authors
- [DPende](https://github.com/DPende)
- [VinciGit00](https://github.com/VinciGit00)
- [f-aguzzi](https://github.com/f-aguzzi)

## License

This library is provided under the [MIT license](LICENSE).