function PElem() {
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

    return this;
}

function PWindow() {
    this.prototype = new PElem();


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

function PopUp() {
    this.prototype = new PElem();

    this.setPrompt = (prompt) => {
        this.prompt = prompt;
        return;
    };
}

function Modal(parentElement) {
    this.prototype = new PopUp(parentElement);

    this.addBtn = 2;
}

function Button(parentElement) {
    this.prototype = new PElem(parentElement);
}
