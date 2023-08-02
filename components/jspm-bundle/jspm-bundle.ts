import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './jspm-bundle.css';

@customElement('jspm-bundle')
export class JSPMBundle extends LitElement {

    static override styles = [styles];

    @property()
    packages = "";

    override render () {
      const { packages } = this;
      return html`
        <jspm-generator install="${packages}"></jspm-generator>
        <jspm-display></jspm-display>
      `;
    }
}
