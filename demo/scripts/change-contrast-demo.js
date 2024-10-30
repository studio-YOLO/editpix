import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img3.jpeg";

var image = new Image();
image.src = url;

// waiting image load
image.onload = () => {
    document.body.appendChild(image);
    // edit the image
    editpix.changeContrast(image, 2)
        .then(resultImage => {
            // render modified image
            document.body.appendChild(resultImage);
        })
        .catch(error => { console.log(error) })
}