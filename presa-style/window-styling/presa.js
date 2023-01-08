function PElem(parentElement) {
    //New DOM element for this element

    this.DOMNode = document.createElement("div");

    this.display = () => {
        this.parentElement.appendChild(this.DOMNode);
    };

    this.update = () => {
        this.DOMNode.innerHTML = this.innerHTML;
        this.parentElement.removeChild(this.DOMNode);
        this.parentElement.appendChild(this.DOMNode);
    };

    //Basic relationship definitions
    if (parentElement) {
        this.parentElement = parentElement;
    }

    this.setParentElement = (parentElement) => {
        this.parentElement = parentElement;
    };

    this.getParentElement = () => this.parentElement;
    this.getElement = () => this;
    this.get = () => this;

    const children = [];

    this.addChild = (child) => {
        children.push(child);
    };

    this.removeChild = (child) => {
        const index = children.indexOf(child);
        if (index > -1) {
            children.splice(index, 1);
        }
        return index;
    };

    this.getChildren = () => {
        return children;
    };

    //Styling

    this.setBgColor = (color) => {
        this.bgColor = color;
        return;
    };
    this.setColor = (color) => {
        this.color = color;
        return;
    };
    this.setBgImage = (image) => {
        this.bgImage = image;
        return;
    };

    this.addBoxShadow = (
        shadowX,
        shadowY,
        blurRadius,
        spreadRadius,
        shadowColor
    ) => {
        const boxShadow = `${shadowX} ${shadowY} ${blurRadius} ${spreadRadius} ${shadowColor}`;

        if (!this.boxShadow) {
            this.boxShadow = [boxShadow];
            return;
        }

        this.boxShadow.push(boxShadow);
        return;
    };
    this.setBorder = (borderWidth, borderStyle, borderColor) => {
        this.border = `${borderWidth} ${borderStyle} ${borderColor}`;
        return;
    };

    this.setBlur = (blur) => {
        this.blur = blur;
    };

    //Testing vv
    this.addText = (text) => {
        const textNode = document.createElement("p");
        textNode.innerHTML = text;
        this.DOMNode.appendChild(textNode);
        return;
    };
}

function PWindow(parentElement) {
    PElem.call(this, parentElement);

    this.DOMNode.classList.add("presa-window");
    this.id = newId();
    this.DOMNode.id = this.id;

    this.display = () => {
        this.parentElement.appendChild(this.DOMNode);
        dragElement(document.getElementById(this.id));
    }
    //Event listeners for dragging


    function dragElement(elmnt) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        return false;
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

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    // this.DOMNode.addEventListener("mousedown", () => {
    //     this.DOMNode.classList.add("drag-active");
    //     this.DOMNode.addEventListener("mousemove", onDrag);
    // });
    // document.addEventListener("mouseup", () => {
    //     this.DOMNode.classList.remove("drag-active");
    //     this.DOMNode.removeEventListener("mousemove", onDrag);
    // });

    // //Utility funnction for dragging
    // function onDrag({ movementX, movementY }) {
    //     const thisElem = document.getElementById(this.id);
    //     let getStyle = window.getComputedStyle(thisElem);
    //     let leftVal = parseInt(getStyle.left);
    //     let topVal = parseInt(getStyle.top);
    //     thisElem.style.left = `${leftVal + 5*movementX}px`;
    //     thisElem.style.top = `${topVal + 5*movementY}px`;
    // }
}

function PopUp(parentElement) {
    PElem.call(this, parentElement);

    this.setPrompt = (prompt) => {
        this.prompt = prompt;
        return;
    };
}

function Modal(parentElement) {
    PopUp.call(this, parentElement);

    this.addBtn = 2;
}

function Button(parentElement) {
    PElem.call(this, parentElement);
}

// Utility functions

function newId() {
    const id = "" + randomString(7, "aA") + randomString(3, "#");

    return id;
}

//Generates a random string of characters
//Used like this:
//   console.log(randomString(16, 'aA'));
//   console.log(randomString(32, '#aA'));
//   console.log(randomString(64, '#A!'));

function randomString(length, chars) {
    let mask = "";
    const [lower, upper, numbers, symbols] = [
        chars.indexOf("a") > -1,
        chars.indexOf("A") > -1,
        chars.indexOf("#") > -1,
        chars.indexOf("!") > -1,
    ];
    if (lower) mask += "abcdefghijklmnopqrstuvwxyz";
    if (upper) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) mask += "0123456789";
    if (symbols) mask += `~\`!@#$%^&*()_+-={}[]:";'<>?,./|\\`;

    let result = "";

    if (lower || upper || numbers || symbols) {
        for (let i = length; i > 0; --i)
            result += mask[Math.floor(Math.random() * mask.length)];
    } else {
        // I dont know what this means or how it's supposed to work
        // When I wrote this, both God and I knew what this was
        // Now only God knows.
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

////////////////////////////////////////////////////////////////
//////////////  vv  TESTING GROUNDS, IGNORE  vv  ///////////////
////////////////////////////////////////////////////////////////

const DOMBody = document.querySelector("body");

const testWindow = new PWindow(DOMBody);
testWindow.addText("CUM");
testWindow.display();

////////////////////////////////////////////////////////////////
//////////////  ^^  TESTING GROUNDS, IGNORE  ^^  ///////////////
////////////////////////////////////////////////////////////////
