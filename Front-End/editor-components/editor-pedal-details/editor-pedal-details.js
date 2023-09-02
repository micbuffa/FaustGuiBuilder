(function (window, document, undefined) {

    const doc = (document._currentScript || document.currentScript).ownerDocument;
    const template = doc.querySelector('#template-details');

    class EditorPedalDetails extends HTMLElement {

        constructor() {
            super();

            this.root = this.attachShadow({ mode: 'open' });
            const temp = document.importNode(template.content, true);

            this.root.appendChild(temp);

            this.setUploadEnvironnement();

            this.setUpEventListeners();

        }

        setUploadEnvironnement() {
            //-------------------- Image Upload----------------------
            // just upload and use
            //  http://tech.pro/tutorial/1383/javascript-one-language-to-rule-them-all
            var ls = window.localStorage;
            var photo = this.root.getElementById('uploadImage');
            var fileReader = new FileReader();
            var img = new Image();
            var lastImgData = ls.getItem('image');

            if (lastImgData) {
                img.src = lastImgData;
            }
            fileReader.onload = function (e) {
                //console.log(typeof e.target.result, e.target.result instanceof Blob);
                img.src = e.target.result;
            };
            img.onload = () => {
                img.classList.add("menu-img");
                img.classList.add("background-image");
                img.addEventListener('click', (event) => {
                    this.editablePedal.setBackgroundImagebysrc(event.target.src);

                })
                this.root.querySelector('#background-images').appendChild(img);

            };
           
           /* photo.addEventListener('change', function () {
                var file = this.files[0];
                return file && fileReader.readAsDataURL(file);
            });*/
            //-----------------------------------------

        }


        setEditablePedal(editablePedal) {
            //console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
            //console.log(editablePedal)
            this.editablePedal = editablePedal;
            this.refreshInputs();

            this.enableInputs();
            this.setInputListeners();


            this.editablePedal.addEventListener('config-changed', (e) => {
                this.refreshInputs();
            });

        }

        setUpEventListeners() {

            let pedalElemPreviews = this.root.querySelectorAll('pedal-elem-previews');

            pedalElemPreviews.forEach(elm => {
                elm.addEventListener('preview-selected', e => {
                    switch(e.detail.type) {
                        case "backgroundImages" :
                                //console.log("Background image selected type = " + e.detail.type + " file : " + e.detail.fileName)
                                this.setBackgroundImage(e.detail.fileName);
                            break;
                    }
                    //this.editablePedal.addElement(e.detail.type, e.detail.fileName)
                });
            });
        }
        
        /*
        addElem(e) {
            //console.log('Hello world');
        }*/

        refreshInputs() {
            //console.log("##### refresh inputs #####");
            //console.log(this.editablePedal)
     
            for (let inputElem of this.root.querySelectorAll('input')) {
                let value = this.editablePedal.getAttribute(inputElem.name);
                let elemName = inputElem.name;

                //if(elemName === "width" || elemName === "height") {
                    //console.log("before  input value name = " + elemName + "  value = " + value);

                    //value = Math.round(value);
                    inputElem.value = value;

                    //console.log("after setting input value name = " + elemName + " with value = " + value);

                //} else {
                    //inputElem.setAttribute('value', value);

                //}

            }
        }

        setInputListeners() {
            // For main inputs
            for (let inputElem of this.root.querySelectorAll('input')) {
            inputElem.addEventListener('input', (event) => {
                //console.log("before : " + this.editablePedal.getAttribute(event.target.name));

                    this.editablePedal.setAttribute(event.target.name, event.target.value);
                    //console.log("Setting " + event.target.name + " with value " + event.target.value);
                    //console.log("after : " + this.editablePedal.getAttribute(event.target.name));
                });
            }

            // For background images
            for (let backgroundImageElem of this.root.querySelectorAll('.background-image')) {
                backgroundImageElem.addEventListener('click', (event) => {
                    this.setBackgroundImage(event.target.alt);
                })
            }
        }

        enableInputs() {
            for (let inputElem of this.root.querySelectorAll('input')) {
                inputElem.disabled = false;
            }

            for (let inputElem of this.root.querySelectorAll('button')) {
                inputElem.disabled = false;
            }
        }

        setBackgroundImage(value) {
            this.editablePedal.setBackgroundImage(value);
        }

        addIcon(value) {
            pedal.addElement('icon', value);
        }

        addKnob() {
            pedal.addElement('knob');
        }

        addSwitch() {
            pedal.addElement('switch');
        }
        addLabel() {
            pedal.addElement('label');
        }
    }



    window.customElements.define('editor-pedal-details', EditorPedalDetails);
})(window, document);