import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img3.jpeg";

var image = new Image();
image.src = url;

//waiting image load
image.onload = () => {

    editpix.mirrorImage(image)
        .then(resultImage => {
            document.body.appendChild(image);
            document.body.appendChild(resultImage);
        })
        .catch(error => { console.log(error) })
}