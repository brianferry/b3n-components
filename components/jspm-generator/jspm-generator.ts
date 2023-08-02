import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import axios from 'axios';

export class GeneratedEvent extends Event {
    data: any;
    constructor(data: String) {
        super('jspm-data-generated', { bubbles: true, composed: true });
        this.data = data;
    }
}

@customElement('jspm-generator')
export class JSPMGenerator extends LitElement {
    
  #api = "https://api.jspm.io/generate?install=";

  @property()
  install = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.generateImportMap();
  }

  async generateImportMap() {
    const installFormatted = this.install.split(',').map((item) => {
        return `[\"${item}\"]`;
    }).join(',');
    const response = await axios.get(this.#api + installFormatted);
    const data = await response.data;
    this.dispatchEvent(new GeneratedEvent(data));
  }
}
