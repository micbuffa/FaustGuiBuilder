(function (window, document, undefined) {


    // Current document needs to be defined to get DOM access to imported HTML
    const doc = document.currentScript.ownerDocument;

    const template = doc.querySelector('#template-previews');
    
    const PREVIEW_SELECTED_EVENT = "previewSelected";
    
    class PedalElemPreviews extends HTMLElement {

        
        static get observedAttributes() {
            return ['url', 'pedal-element-type'];
        }
        
        constructor() {
            super();
            
            this.root = this.attachShadow({mode: 'open'});
            
            const temp = document.importNode(template.content, true);

            this.root.appendChild(temp);
            
            this.previews = [];

            this.fetchPreviews();
        }

        fetchPreviews() {
            let url = this.getAttribute('url');
            if(!url) return;
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.previews = data;
                    this.setUpPreviews();
                })
                .catch(err => {
                    console.error('Error fetching preview image names: ' + err);
                });

        }

        setUpPreviews() {
            let container = this.root.querySelector("#scrollableContent");

            for(let previewFile of this.previews.files) {
                if (previewFile !== ".DS_Store") {
                    let previewElem = document.createElement('img');
                    previewElem.className = 'menu-img';
                    previewElem.id = 'preview';
                    previewElem.src = this.previews.filesUrl + previewFile
                    previewElem.alt = previewFile;
                    
                    previewElem.onclick = (e) => {
                        let detail = {
                            type: this.getAttribute('pedal-element-type'),
                            fileName: e.target.alt
                        };

                        let event = new CustomEvent('preview-selected', {detail: detail});
                        this.dispatchEvent(event);
                    }

                    container.appendChild(previewElem);
                    //this.root.appendChild(previewElem);
                }
            }
        }

    }


    window.customElements.define('pedal-elem-previews', PedalElemPreviews);

})(window, document)