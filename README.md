### Launching the application

In order to launch the application, we must:

- Start the server application.
- Start the browser application.

#### 1. Lauching the server application:

**Requirements:**
- Node.js installed

------------


The first step consists on launching the server application.

After navigating to the directory "PedalEditor/Back-End", execute the following command:
``` 
node ./index.js
```
The default port is: 3000.

#### 2. Lauching the Browser application:
**Requirements:**
- Chrome Server installed and serving the directory "PedalEditor/Front-End"

------------


Navigate to the Web Server URL displayed by Chrome Server.

Example: http://127.0.0.1:8887


### Editor Components

Editor components are used to set the parameters of an editable pedal or of an element of that editable pedal.

#### Available Editor Components

Herewidth is a list of already implemented pedal components.

##### - Pedal details

This component is used to set the parameters of a pedal.

The pedal parameters that can be set are:

-Width
 -Height
-Background color
-Background image
-Background Image transparency
-Name
-Border radius

The custom element of this component is:

```html
<editor-pedal-details></editor-pedal-details>
```

##### - Pedal Elements List

This component shows a list of pedal elements by their ids.

After selecting a pedal element in the list, the element is selected on the editable pedal.
After selecting a pedal element on the pedal, it is selected on the list.

The custom element of this component is:
```html
<editor-element-list></editor-element-list>
```
#### How to create a new Editor Component ?

An editor component is always a Web Component.

##### - Implementation
In the `NewEditorComponent` class contained in the `new-editor-component.html` Web Component, we should implement the following functions:

1. `constructor()`: For attaching the shadow dom.
Implementation exemple:
```javascript
constructor() {
	super();

	this.root = this.attachShadow({mode: 'closed'});
	const temp = document.importNode(template.content, true);

	this.root.appendChild(temp);
}
```
2. `setEditablePedal()`: To plug the editable pedal to the editor component. This function should also enable inputs, set input listeners, refresh inputs and add an event listener that refreshes inputs as soon as the pedal configuration changes.
Implementation exemple:
```javascript
setEditablePedal(editablePedal) {
	this.editablePedal = editablePedal;

	this.enableInputs();
	this.setInputListeners();
	this.refreshInputs();

	this.editablePedal.addEventListener('config-changed', (e) => {
		this.refreshInputs();
	});
}
```

3. `refreshInputs()`: Synchonize the value of the input fields with the current configuration of the pedal.
Implementation exemple:
```javascript
refreshInputs() {
	for(let inputElem of this.root.querySelectorAll('input')) {
		inputElem.value = this.editablePedal.getAttribute(inputElem.name);
	}
}
```

4. `setInputListeners()`: Set "change" event listeners for input elements and "click" event listeners for buttons.
Implementation exemple showing change event listeners:
```javascript
setInputListeners() {
...
	// Synchonize input fields with pedal configuration
	for(let inputElem of this.root.querySelectorAll('input')) {
		inputElem.addEventListener('change', (event) => {
			this.editablePedal.setAttribute(event.target.name, event.target.value);
		});
	}
...
}
```

5. `enableInputs()`: Unable input fields and buttons.
Implementation exemple showing how to unable input fields:
```javascript
enableInputs() {
...
	for(let inputElem of this.root.querySelectorAll('input')) {
		inputElem.disabled = false;
	}
...
}
```

##### - Instantiation

In `index.html`, to instanciate the editor component we should:

1. Add the custom element of that component as a child of the editor menu
```html
	<!-- The editor container -->
	<div id="accordion">
		<ul>
			...
			<li>
				<a href="#new-editor-component-id">NEW EDITOR COMPONENT TITLE</a>
				<new-editor-component id="#new-editor-component-id" class="accordion"></new-editor-component>
			</li>
			...
		</ul>
	</div>
```

2. Plug the pedal to the editor component:
```javascript
function plugPedalToEditor() {
...
	// Get the editor component element.
	let elementList = document.querySelector('#new-editor-component');
	
	// Plug the new pedal to the editor component.
	elementList.setEditablePedal(pedal);
...
}
```




### Editable pedal

### Functional Pedal Generator
# FaustGuiBuilder
