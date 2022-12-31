

function PElem (parentElement) {

    //Basic relationship definitions

    this.parentElement = parentElement;

    this.getParentElement = () => this.parentElement;
    this.getElement = () => this;
    this.get = () => this;

    this.children = [];

    this.addChild = (child) => {
        this.children.push(child);
    }

    this.removeChild = (child) => {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
        }
        return index;
    }

    this.getChildren = () => {
        return this.children;
    }

    //Styling

    this.setBgColor = (color) => {
        this.bgColor = color;
        return;
    }
    this.setColor = (color) => {
        this.color = color;
        return;
    }
    this.setBgImage = (image) => {
        this.bgImage = image;
        return;
    }

    this.addBoxShadow = (shadowX, shadowY, blurRadius, spreadRadius, shadowColor) => {
        const boxShadow = `${shadowX} ${shadowY} ${blurRadius} ${spreadRadius} ${shadowColor}`
        
        if (!this.boxShadow) {
            this.boxShadow = [boxShadow];
            return;
        }

        this.boxShadow.push(boxShadow);
        return;
    }
    this.setBorder = (borderWidth, borderStyle, borderColor) => {
        this.border = `${borderWidth} ${borderStyle} ${borderColor}`;
        return;
    }

    this.setBlur = (blur) => {
        this.blur = blur;
    }
}

function PopUp (parentElement) {
    this.prototype = new PElem(parentElement);
    
    this.setPrompt = (prompt) => {
        this.prompt = prompt;
        return;
    };
};

function Modal (parentElement) {
    this.prototype = new PopUp(parentElement);

    this.addBtn = 2;
}

function Button (parentElement) {
    this.prototype = new PElem(parentElement);
}