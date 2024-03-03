import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img1.jpg";

var image = new Image();
image.src = url;

//waiting image load
image.onload = () => {

    // convert image to black and white
    editpix.changeOpacity(image, 128)
        .then(newImage => {
            document.body.appendChild(image);
            document.body.appendChild(newImage);
        })
        .catch(error => { console.log(error) })
};