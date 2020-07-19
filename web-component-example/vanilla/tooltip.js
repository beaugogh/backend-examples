class Tooltip extends HTMLElement {
	constructor() {
		super();
		console.log('constructor here');
		this._tooltipContainer;
		this._tooltipText = 'Some dummy tooltip text';
		// set up shadow DOM
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
        <style>
          div {
						font-weight: normal;
            background-color: grey;
            color: white;
						position: absolute;
						top: 1.5rem;
						left: 0.75rem;
						z-index: 10;
						padding: 0.15rem;
						border-radius: 3px;
						box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
					}  
					
					.highlight {
						background-color: green;
					}

					:host {
						border: 2px green solid;
					}

					:host(.important) {
						border: 2px red solid;
						background: var(--color-primary, #ccc)
					}

					:host-context(p) {
						font-weight: bold;
					}

					::slotted(.highlight)  {
						border-bottom: 3px dotted red;
					}

					.icon {
						background-color: black;
						color: white;
						padding: 0.15rem 0.5rem;
						text-align: center;
						border-radius: 50%;
					}
        </style>
        <slot>Some default value in the slot.</slot>
        <span class="icon">?</span>
    `;
	}

	// the callback when the DOM is ready to be accessed
	connectedCallback() {
		if (this.hasAttribute('text')) {
			this._tooltipText = this.getAttribute('text');
		}
		const tooltipIcon = this.shadowRoot.querySelector('span');
		tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
		tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
		this.shadowRoot.appendChild(tooltipIcon);
		this.style.position = 'relative';
	}

	_showTooltip() {
		// create and style tooltip element programmatically,
		// but the styles can still be affected by styling from outside the component,
		// thus an alternative is to use shadow DOM
		this._tooltipContainer = document.createElement('div');
		this._tooltipContainer.textContent = this._tooltipText;
		this.shadowRoot.appendChild(this._tooltipContainer);
	}

	_hideTooltip() {
		this.shadowRoot.removeChild(this._tooltipContainer);
	}
}

customElements.define('uc-tooltip', Tooltip);
