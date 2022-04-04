import Block from "src/block";

export function render(query: string, block: Block) {
    const root = document.querySelector(query);
    if (root) {
        root.appendChild(block.getContent());
        block.dispatchComponentDidMount();
    }

    return root;
} 