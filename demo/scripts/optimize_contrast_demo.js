import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img2.jpg";

var image = new Image();
image.src = url;

image.onload = () => {

    editpix.toOptimizedContrast(image)
        .then(highContrastImage => {
            document.body.appendChild(image);
            document.body.appendChild(highContrastImage);
        })
        .catch(error => { console.log(error) })
}
