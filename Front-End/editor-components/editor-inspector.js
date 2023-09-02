(function (window, document, undefined) {

    const doc = (document._currentScript || document.currentScript).ownerDocument;
    const template = doc.querySelector('#pedal-details');

    class EditorInspector extends HTMLElement {

        constructor() {
            super();
            //console.log("EDITOR INSPECTOR#########################")
            this.root = this.attachShadow({ mode: 'open' });
            const temp = document.importNode(template.content, true);

            this.root.appendChild(temp);

        }

        setEditablePedal(editablePedal) {
            this.editablePedal = editablePedal;
            this.setInputListeners();

            this.editablePedal.addEventListener('config-changed', (e) => {
                this.enableInputs();
                this.refreshInputs();
            });
        }

        refreshInputs() {
            let value, elem;
            elem = this.editablePedal.getSelectedElement();
            if(!elem) return;

            for (let inputElem of this.root.querySelectorAll('input')) {
                //inputElem.setAttribute('value', this.editablePedal.getSelectedElement()[inputElem.name]);
                value = elem[inputElem.name];
                inputElem.value = value;
            }

            //console.log("elem font = " + elem.label_fontfamily)

            // show current font in menu
            let menuFonts = this.root.querySelector('#inspector-label-font-family');
            for(var i = 0;i < menuFonts.options.length;i++){
                //console.log("select.options[i].value = " + menuFonts.options[i].value);
                if(menuFonts.options[i].value === elem.label_fontfamily){
                    menuFonts.options[i].selected = true;
                }
            }
            // show previews images of knobs, slider switches depending in elem type...
            this.displayPreviews(elem.type);
        }

        hideAllPreviews() {
            this.root.querySelector('#preview-knobs').style.display= "none";
            this.root.querySelector('#preview-switches').style.display= "none";
            this.root.querySelector('#preview-sliders').style.display= "none";
        }

        displayPreviews(type) {
           this.hideAllPreviews();

            switch(type) {
                case "knob":
                    this.root.querySelector('#preview-knobs').style.display="";
                    break;
                case "switch":
                    this.root.querySelector('#preview-switches').style.display="";
                    break;
                case "slider":
                    this.root.querySelector('#preview-sliders').style.display="";
                    break;
            }
        }

        setInputListeners() {
            // For main inputs
            for (let inputElem of this.root.querySelectorAll('input')) {
                inputElem.addEventListener('input', (event) => {
                    let eventName = event.target.name;
                    if((eventName === "width" || eventName === "height")) {
                        if(this.root.querySelector('#keep-ratio').checked) {
                            // lets have width and height with the same ratio
                            let oldValue = parseInt(this.editablePedal.getSelectedElement()[eventName]);
                            let newValue = parseInt(event.target.value);
                            let ratio = newValue/oldValue;
                            //console.log("oldValue = " + oldValue);
                            //console.log("newValue = " + newValue);
                            //console.log("ratio = " + ratio);

                            let newWidth = this.editablePedal.getSelectedElement().width * ratio;
                            let newHeight = this.editablePedal.getSelectedElement().height * ratio;
                            //console.log("newWidth = " + newWidth);
                            //console.log("newHeight = " + newHeight);

                            this.editablePedal.setSelectedElementAttribute("width", newWidth);
                            this.editablePedal.setSelectedElementAttribute("height", newHeight);
                            //this.refreshInputs(); // to refresh the witdth/height sliders
                            if(eventName === "width") this.root.querySelector('#inspector-height').value = newHeight;
                            if(eventName === "height") this.root.querySelector('#inspector-width').value = newWidth;
                        } else {
                            this.editablePedal.setSelectedElementAttribute(eventName, event.target.value);
                        }
                        //console.log("Keep Ratio = " + keepRationValue);
                    } else {
                        this.editablePedal.setSelectedElementAttribute(eventName, event.target.value);
                    }
                });
            }

            // For selections
            for (let backgroundImageElem of this.root.querySelectorAll('select')) {
                backgroundImageElem.addEventListener('change', (event) => {
                    this.editablePedal.setSelectedElementAttribute(event.target.name, event.target.value);
                    //console.log(event.target.name + event.target.value);
                })
            }

            // For changing type of knobs, etc.
                let pedalElemPreviews = this.root.querySelectorAll('pedal-elem-previews');
    
                pedalElemPreviews.forEach(elm => {
                    elm.addEventListener('preview-selected', e => {
                        //this.editablePedal.addElement(e.detail.type, e.detail.fileName)
                        //console.log("PEDAL ELEMENT PREVIEWS knob selected : " + e.detail.type + " file="  + e.detail.fileName);
                        this.editablePedal.setSelectedElementAttribute("model", e.detail.fileName);
                        //this.editablePedal.setSelectedElementAttribute("width", 70);
                        //this.editablePedal.setSelectedElementAttribute("height", 70);
                    });
                });    
        }

        enableInputs() {
            for (let inputElem of this.root.querySelectorAll('input')) {
                inputElem.disabled = false;
            }

            for (let inputElem of this.root.querySelectorAll('select')) {
                inputElem.disabled = false;
            }
        }

    }

    window.customElements.define('editor-inspector', EditorInspector);
})(window, document);