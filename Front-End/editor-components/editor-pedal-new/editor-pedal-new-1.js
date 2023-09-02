(function (window, document, undefined) {

    const doc = (document._currentScript || document.currentScript).ownerDocument;
    const template = doc.querySelector('#template-new1');
    
    class EditorPedalNew1 extends HTMLElement {

        
        constructor() {
            super();
            
            this.root = this.attachShadow({mode: 'closed'});
            
            const temp = document.importNode(template.content, true);

            this.root.appendChild(temp);
           
        }    

    }

    window.customElements.define('editor-pedal-new-1', EditorPedalNew1);

})(window, document)