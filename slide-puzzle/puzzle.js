var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            // TOUCH FUNCTIONALITY
            tile.addEventListener("click", tileClick); // Touch-based swapping

            document.getElementById("board").append(tile);

        }
    }
}

function tileClick() {
    if (!currTile) {
        currTile = this; // Select the first tile
        currTile.classList.add("selected"); // Optional: Highlight the selected tile
    } else {
        otherTile = this; // Select the second tile

        if (!otherTile.src.includes("9.jpg")) {
            currTile.classList.remove("selected");
            currTile = null;
            return;
        }

        let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
        let r = parseInt(currCoords[0]);
        let c = parseInt(currCoords[1]);

        let otherCoords = otherTile.id.split("-");
        let r2 = parseInt(otherCoords[0]);
        let c2 = parseInt(otherCoords[1]);

        let moveLeft = r == r2 && c2 == c-1;
        let moveRight = r == r2 && c2 == c+1;

        let moveUp = c == c2 && r2 == r-1;
        let moveDown = c == c2 && r2 == r+1;

        let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

        if (isAdjacent) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;

            currTile.src = otherImg;
            otherTile.src = currImg;

            turns += 1;
            document.getElementById("turns").innerText = turns;
        }

        currTile.classList.remove("selected");
        currTile = null;
        otherTile = null;
    }
}
