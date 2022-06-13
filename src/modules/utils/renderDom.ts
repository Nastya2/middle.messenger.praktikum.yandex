import Component from "src/modules/shared/services/component";

export function render(query: string, block: Component) {
    const root = document.querySelector(query);
    console.log(root, query);
    if (root) {
        root.appendChild(block.getContent());
        block.dispatchComponentDidMount();
    }

    return root;
} 