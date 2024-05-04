import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "images/img3.jpeg";

var image = new Image();
image.src = url;

var container = document.createElement("div");
container.classList.add("container")



// waiting image load
image.onload = () => {
    // image dimension before resizing
    console.log("Dimension before resizing: " + image.naturalWidth + "x" + image.naturalHeight);

    document.body.appendChild(image)

    // resize image by percentage
    editpix.resizeByPercentage(image, 80)
        .then(resizedImage => {
            // image dimension after resizing
            console.log("Dimension after resizing by %: " + resizedImage.naturalWidth + "x" + resizedImage.naturalHeight);
            document.body.appendChild(resizedImage)
        })
        .catch(error => { console.log(error) })

    // resize image by width
    editpix.resizeByWidth(image, 100)
        .then(resizedImage => {
            console.log("Dimension after resizing width equals to 100px: " + resizedImage.naturalWidth + "x" + resizedImage.naturalHeight);
            document.body.appendChild(resizedImage)
        })
        .catch(error => { console.log(error) })

    // resize image by width
    editpix.resizeByHeight(image, 100)
        .then(resizedImage => {
            console.log("Dimension after resizing height equals to 100px: " + resizedImage.naturalWidth + "x" + resizedImage.naturalHeight);
            document.body.appendChild(resizedImage)
        })
        .catch(error => { console.log(error) })
};
