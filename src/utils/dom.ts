export function getElement<T extends Element>(selector: string, parent: ParentNode = document): T {
    const element = parent.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element "${selector}" was not found`);
    }

    return element;
}

export function cloneTemplate(template: HTMLTemplateElement): DocumentFragment {
    return template.content.cloneNode(true) as DocumentFragment;
}
