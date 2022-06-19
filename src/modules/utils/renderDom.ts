import Component from "src/modules/shared/services/component";

export function renderDOM(query: string, block: Component) {
    const root = document.querySelector(query);
    if (root) {
        root.appendChild(block.getContent());
        block.dispatchComponentDidMount();
    }

    return root;
} 