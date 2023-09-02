(function(window, document, undefined) {
  const doc = (document._currentScript || document.currentScript).ownerDocument;
  const template = doc.querySelector("#template-editor-faust");

  class EditorFaust extends HTMLElement {
    static get observedAttributes() {
      return [];
    }

    constructor() {
      super();

      this.root = this.attachShadow({ mode: "closed" });

      const temp = document.importNode(template.content, true);

      this.root.appendChild(temp);

      this.faustParser = new FaustParser();

      this.faustCodeBox = this.root.querySelector("#faust-code-box");

      this.setUpListeners();
    }

    setUpListeners() {
      this.root.querySelector("#create-pedal").addEventListener("click", () => {
        this.createPedal();
      });
    }

    createPedal() {
      let elements = this.faustParser.extractElements(this.faustCodeBox.value);
      //console.log(elements.map(elm => elm.width));
      let width = Math.max(...elements.map(elm => elm.width)) + 20;
      width = width < 130 ? 130 : width;
      let height = 10;

      elements.forEach(elem => {
        elem.x = width / 2 - elem.width / 2;
        elem.y = height;
        height += elem.height + 30;
      });

      let detail = {
        width: width,
        height: height,
        elements: elements
      };

      //console.log(elements);
      let event = new CustomEvent("create-pedal", { detail: detail });
      this.dispatchEvent(event);
    }

    // MICHEL BUFFA : this is the part that should be
    // updated in order to display a much better
    // default layout instead of all elems one below
    // the other...
    pedalConfigFromUI(faustUI, currentWapName) {
      let elements = this.faustParser.pedalConfigFromUI(faustUI, currentWapName);
      let width = Math.max(...elements.map(elm => elm.width)) + 20;
      width = width < 130 ? 130 : width;
      let height = 10;

      elements.forEach(elem => {
// MICHEL BUFFA DIRTY FIX: as labels may contain
        // spaces and / and are used as HTML ids, let's filter
        // these chars ansd replace them by underscores...
        elem.label = elem.label.replace(/ /g, "_");
        elem.label = elem.label.replace("/", "_");

        elem.x = width / 2 - elem.width / 2;
        elem.y = height;
        height += elem.height + 30;
      });

      let detail = {
        width: width,
        height: height,
        elements: elements
      };

      return detail;
    }
  }

  window.customElements.define("editor-faust", EditorFaust);
})(window, document);
