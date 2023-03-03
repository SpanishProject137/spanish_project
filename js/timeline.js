dragElement(document.getElementById("Timeline"));
let precent = 100;

function dragElement(elmnt) {
    var pos1 = 0, pos3 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos3 = e.clientX;
        // set the element's new position:
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        precent += e.movementX / 20;
        if (precent > 100) {
            precent = 100;
        } else if (precent < 0) {
            precent = 0;
        };

        const track = document.getElementsByClassName("img")
        for (let i = 0; i < track.length + 1; i++) {
            track[i].animate({
                backgroundPosition: `${precent}% 0px`
            }, { duration: 1200, fill: "forwards"})
        } 
    }

    function afterDrag() {
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        moveX = (elmnt.offsetLeft - pos1) + "px";
        document.onmouseup = null;
        document.onmousemove = null;
    }
}