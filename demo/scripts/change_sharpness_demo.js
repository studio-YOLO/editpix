import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img7.jpeg";

var image = new Image();
image.src = url;

//waiting image load
image.onload = () => {

    editpix.changeSharpness(image, 70)
        .then(resultImage => {
            document.body.appendChild(image);
            document.body.appendChild(resultImage);
        })
        .catch(error => { console.log(error) })
}