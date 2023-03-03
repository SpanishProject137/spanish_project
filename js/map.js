const Map = document.getElementById("Map")

const scaleSpeed = .5;
const height = 556;
const width = 694;
let scale = 1;
let moveX = 0;
let moveY = 0;

let mouseUp = true;

Map.style.width = width + "px";
Map.style.height = height + "px";

dragElement(document.getElementById("Map"));

setInterval(function () {
    window.onwheel = function (e) {
        if (e.deltaY < 0) {
            scale *= 0 - e.deltaY;
        } else if (e.deltaY > 0) {
            scale /= e.deltaY
        }

        if (scale < 0.1) {
            scale = 0.1;
        }
        console.log(e.deltaY + ", " + scale)
        Map.style.width = width + "px";
        Map.style.height = height + "px";
        Map.style.scale = scale
    };
}, 1)
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    setInterval(function () {
        document.addEventListener('mouseup', function () {
            mouseUp = true;
        });
        document.addEventListener('mousedown', function () {
            mouseUp = false;
        });


        if (mouseUp) {
            moveY = moveY * .9999
            moveX = moveX * .9
            elmnt.style.top = moveY + "px";
            elmnt.style.left = moveX + "px";
        };
    }, 1);

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function afterDrag() {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        moveY = (elmnt.offsetTop - pos2) + "px";
        moveX = (elmnt.offsetLeft - pos1) + "px";
        document.onmouseup = null;
        document.onmousemove = null;
    }
};