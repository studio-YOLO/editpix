import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img3.jpeg";

var image = new Image();
image.src = url;

//waiting image load
image.onload = () => {

    editpix.changeContrast(image, 2)
        .then(highContrastImage => {
            document.body.appendChild(image);
            document.body.appendChild(highContrastImage);
        })
        .catch(error => { console.log(error) })
}