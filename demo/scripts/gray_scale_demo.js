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