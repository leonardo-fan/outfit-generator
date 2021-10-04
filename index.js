// https://stackoverflow.com/questions/1936021/javascript-eyedropper-tell-color-of-pixel-under-mouse-cursor

var articleOfClothing = {
    type: null, //to do
    image: null, 
    primaryColor: null,
    secondaryColor: null
};

//populate type of clothing
var typeOfClothing = document.getElementById("articleType");
typeOfClothing.onchange = function() {
    articleOfClothing.type = typeOfClothing.options[typeOfClothing.selectedIndex].text;
}

//populate canvas, preview and image attribute
var clothesInput = document.getElementById("clothesInput");
var clothesCanvas =  document.getElementById("clothesCanvas");
clothesInput.onchange = function (event) {
    articleOfClothing.image = event.target.files[0];
    imageForCanvas = document.getElementById("imageForCanvas");
    imageForCanvas.src = URL.createObjectURL(articleOfClothing.image);
    
    //image attribute

    //canvas
    var canvasImage = document.getElementById("imageForCanvas"); 
    canvasImage.onload = function() {
        var canvas = document.getElementById("clothesCanvas");
        canvas.width = canvasImage.width;
        canvas.height = canvasImage.height;
        //statement to change size of canvas
        canvas.getContext('2d').drawImage(canvasImage,0,0);
    }

    // //preview
    // var previewImage = document.getElementById("previewImage");
    // previewImage.src = URL.createObjectURL(articleOfClothing.image);
    // previewImage.width = 100;
};

//Color selector from Primary button
var primaryColorSelector = document.getElementById("primaryColorSelector");
var primaryColorRectangle = document.getElementById("primaryColor");
primaryColorSelector.onclick = function () {
    clothesCanvas.style.cursor = "crosshair";
    //eyedropper tool - return color
    clothesCanvas.onclick = function (event) {
    var x = getMousePosition(clothesCanvas, event).x;
    var y = getMousePosition(clothesCanvas, event).y;
    var colorToAdd = clothesCanvas.getContext('2d').getImageData(x, y, 1, 1).data
    var r = colorToAdd[0];
    var g = colorToAdd[1];
    var b = colorToAdd[2];
    
    articleOfClothing.primaryColor = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
    primaryColorRectangle.style = "fill: " + articleOfClothing.primaryColor + ";"
    }
}

//Color selector from Secondary button
var secondaryColorSelector = document.getElementById("secondaryColorSelector");
var secondaryColorRectangle = document.getElementById("secondaryColor");
secondaryColorSelector.onclick = function () {
    clothesCanvas.style.cursor = "crosshair";
    //eyedropper tool - return color
    clothesCanvas.onclick = function (event) {
        var x = getMousePosition(clothesCanvas, event).x;
        var y = getMousePosition(clothesCanvas, event).y;
        var colorToAdd = clothesCanvas.getContext('2d').getImageData(x, y, 1, 1).data
        var r = colorToAdd[0];
        var g = colorToAdd[1];
        var b = colorToAdd[2];
        
        articleOfClothing.secondaryColor = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
        secondaryColorRectangle.style = "fill: " + articleOfClothing.secondaryColor + ";"
    }   
}   

//get mouse position function for eyedropper
function getMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//adding to the clothes basket
var addToBasketButton = document.getElementById("addToBasket");
var clothesBasketTable = document.getElementById("clothesBasketTable");
addToBasketButton.onclick = function () {
    var newRow = document.createElement("tr");
        var removeCell = document.createElement("td");
            var removeButton = document.createElement("button");
                removeButton.type = "button";
                removeButton.classList.add("removeButton");
                removeButton.innerHTML = "Remove";
            removeCell.appendChild(removeButton)
        newRow.appendChild(removeCell);
        var typeCell = document.createElement("td");
            typeCell.innerHTML = articleOfClothing.type;
        newRow.appendChild(typeCell);
        var imageCell = document.createElement("td");
            var imagePreview = document.createElement("img");
                imagePreview.src = URL.createObjectURL(articleOfClothing.image);
                imagePreview.width = "100";
            imageCell.appendChild(imagePreview)
        newRow.appendChild(imageCell);
        var primaryColorCell = document.createElement("td");
            var centerPrimaryColorDiv = document.createElement("div");
                centerPrimaryColorDiv.classList.add("center");
                var primaryColorBox = document.createElement("div");
                    primaryColorBox.style = "height: 100px; width: 100px; background-color: " + articleOfClothing.primaryColor;
                centerPrimaryColorDiv.appendChild(primaryColorBox);
            primaryColorCell.appendChild(centerPrimaryColorDiv);
        newRow.appendChild(primaryColorCell);
        var secondaryColorCell = document.createElement("td");
            var centerSecondaryColorDiv = document.createElement("div");
                centerSecondaryColorDiv.classList.add("center");
                var secondaryColorBox = document.createElement("div");
                    secondaryColorBox.classList.add("center");    
                    secondaryColorBox.style = "height: 100px; width: 100px; background-color: " + articleOfClothing.secondaryColor;
                centerSecondaryColorDiv.appendChild(secondaryColorBox)
            secondaryColorCell.appendChild(centerSecondaryColorDiv);
        newRow.appendChild(secondaryColorCell);
    clothesBasketTable.appendChild(newRow);

    removeButtonFunction();
}

//remove article of clothing
function removeButtonFunction() {
    var removeArticle = document.getElementsByClassName("removeButton");
    for (let i = 0; i < removeArticle.length; i++) {
        removeArticle[i].onclick = function(event) {
            var removeButtonClick = event.target;
            removeButtonClick.parentElement.parentElement.remove(); 
        }
    }
}

// //Preview text
// var previewDescription = document.getElementById("previewDescription");
// previewDescription.innerHTML = articleOfClothing.type + " with Primary Colour: ";
// //getbyvalue then inner html for type in string

// Parse through multiple files to display image
// for (let i = 0; i < files.length; i++) {
    //     if (!document.getElementById(files[i].name)) {
        //         var img = document.createElement("img");
        //         img.src = URL.createObjectURL(event.target.files[i]);
        //         img.id = files[i].name;
        //         img.width = 200;
        //         document.getElementById("imageForCanvas").appendChild(img);
        //     } else {
            //         window.alert("Image(s) with same filename exists already");
            //         break;
            //     }
            // }
            

// // see if color exists in array of colors
// console.log(similarColor(colorListArray, colorToAdd));
// if (similarColor(colorListArray, colorToAdd) != true) {
//     colorListArray.push(colorToAdd);
// }
// function similarColor(colorArray, colorCompare) {
//     var result = false; 
//     for (let i = 0; i < colorArray.length; i++) {
//         if (colorArray[i][0] == colorCompare[0] &&
//             colorArray[i][1] == colorCompare[1] &&
//             colorArray[i][2] == colorCompare[2]) {
//                 result = true;
//             } 
//         }
//         return result;
// }