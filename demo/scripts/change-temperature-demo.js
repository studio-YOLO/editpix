import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img8.jpeg";

var image = new Image();
image.src = url;

//waiting image load
image.onload = () => {
    document.body.appendChild(image);

    editpix.changeTemperature(image, 20)
        .then(highContrastImage => {
            document.body.appendChild(highContrastImage);
        })
        .catch(error => { console.log(error) })

    editpix.changeTemperature(image, 50)
        .then(highContrastImage => {
            document.body.appendChild(highContrastImage);
        })
        .catch(error => { console.log(error) })

    editpix.changeTemperature(image, -20)
        .then(highContrastImage => {
            document.body.appendChild(highContrastImage);
        })
        .catch(error => { console.log(error) })

    editpix.changeTemperature(image, -50)
        .then(highContrastImage => {
            document.body.appendChild(highContrastImage);
        })
        .catch(error => { console.log(error) })
}