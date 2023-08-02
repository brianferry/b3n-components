import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import prismStyles from 'prismjs/themes/prism-okaidia.css';
import styles from './jspm-display.css';
import Prism from 'prismjs';

type JSPMData = {
    map?: {
        imports: {
            [key: string]: string;
        },
        scopes: {
            [key: string]: {
                [key: string]: string;
            }
        }
    },
    staticDeps?: string[]
}

@customElement('jspm-display')
export class JSPMDisplay extends LitElement {

    static override styles = [styles, prismStyles];

    #data: JSPMData = {};

    #handleJspmDataGenerated = (e: any) => {
        this.#data = e.data;
        const codeBlock = this.shadowRoot?.querySelector('code');
        if (codeBlock) {
            codeBlock.textContent = "<script type=\"importmap\"> \r\n";
            codeBlock.textContent += JSON.stringify(this.#data.map, null, 2);
            codeBlock.textContent += "\r\n</script>";
            Prism.highlightElement(codeBlock as HTMLElement);
        }
        this.requestUpdate();
    }

    override connectedCallback() {
        super.connectedCallback();
        window.addEventListener('jspm-data-generated', this.#handleJspmDataGenerated);
    }

    override disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('jspm-data-generated', this.#handleJspmDataGenerated);
    }

    override render () {
        const { imports, scopes } = this.#data.map || {};
        return html`
            <code class="language-js">
            </code>`;
    }
}
