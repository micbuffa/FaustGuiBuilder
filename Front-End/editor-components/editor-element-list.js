(function(window, document, undefined) {
        
    const doc = (document._currentScript || document.currentScript).ownerDocument;
    const template = doc.querySelector('#element-list');

    class EditorElementList extends HTMLElement {
        
        constructor() {
            super();

            this.root = this.attachShadow({mode: 'closed'});
            const temp = document.importNode(template.content, true);

            this.root.appendChild(temp);
        }
        
        setEditablePedal(editablePedal) {
            this.editablePedal = editablePedal;
            this.refreshInputs();
        }

        refreshInputs() {

            // Emptying the section.
            let section = this.root.querySelector('#elements_section');
            let firstChild;

            while (firstChild = section.firstChild) {
                section.removeChild(firstChild);
            }

            // Populating the sections.
            for (let pedalElement of this.editablePedal.getElements()) {

                let idElem = document.createElement('div');
                idElem.className = pedalElement.type + '_id';
                idElem.innerHTML = pedalElement.id;
                idElem.onclick = (e) => {
                    selectKnob(e.target.innerHTML);
                }

                section.appendChild(idElem);
            }

        }

        setInputListeners() {

        }

        enableInputs() {
            
        }

    }

    window.customElements.define('editor-element-list', EditorElementList);
})(window, document);