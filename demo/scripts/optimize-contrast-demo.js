import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img2.jpg";

var image = new Image();
image.src = url;

// waiting image load
image.onload = () => {
    document.body.appendChild(image);
    // edit the image
    editpix.toOptimizedContrast(image)
        .then(resultImage => {
            // render modified image
            document.body.appendChild(resultImage);
        })
        .catch(error => { console.log(error) })
}
