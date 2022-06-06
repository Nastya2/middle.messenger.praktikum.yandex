export function render(query, block) {
    const root = document.querySelector(query);
    console.log(root, query);
    if (root) {
        root.appendChild(block.getContent());
        block.dispatchComponentDidMount();
    }
    return root;
}
//# sourceMappingURL=renderDom.js.map