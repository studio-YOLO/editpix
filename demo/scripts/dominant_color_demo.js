import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img1.jpg";

var image = new Image();
image.src = url;

//waiting image load
image.onload = () => {

    editpix.getDominantColor(image, 9)
        .then(dominantColor => {
            // log dominant color in rgb format
            console.log(dominantColor);

            //log dominant color in hex format
            console.log(editpix.convertToHex(dominantColor));
        })
        .catch(error => { console.log(error) })
};