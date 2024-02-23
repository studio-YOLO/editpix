import EditPix from "../../src/editpix.js";

const editpix = new EditPix();

const url = "https://images.pexels.com/photos/11867612/pexels-photo-11867612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";


// convert image to black and white
editpix.getImageFromUrl(url)
    .then(image => {
        document.body.appendChild(image);
    })
    .catch(error => { console.log(error) })
