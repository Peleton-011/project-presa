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
        this.DOMNode.textContent = text;
        return;
    };
}

function PWindow(parentElement) {
    PElem.call(this, parentElement);

    this.DOMNode.classList.add("presa-window");
    this.DOMNode.id =
        //Event listeners for dragging

        this.DOMNode.addEventListener("mousedown", () => {
            this.DOMNode.classList.add("drag-active");
            this.DOMNode.addEventListener("mousemove", onDrag);
        });
    document.addEventListener("mouseup", () => {
        this.DOMNode.classList.remove("drag-active");
        this.DOMNode.removeEventListener("mousemove", onDrag);
    });

    //Utility funnction for dragging
    function onDrag({ movementX, movementY }) {
        let getStyle = window.getComputedStyle(this.DOMNode);
        let leftVal = parseInt(getStyle.left);
        let topVal = parseInt(getStyle.top);
        this.DOMNode.style.left = `${leftVal + movementX}px`;
        this.DOMNode.style.top = `${topVal + movementY}px`;
    }
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
