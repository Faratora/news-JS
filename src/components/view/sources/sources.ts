import './sources.css';
import { cloneTemplate, getElement } from '../../../utils/dom';
import type { NewsSource } from '../../../types/news-api';

class Sources {
    public draw(data: ReadonlyArray<NewsSource>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = getElement<HTMLTemplateElement>('#sourceItemTemp');
        const sourcesContainer: HTMLElement = getElement<HTMLElement>('.sources');

        data.forEach((item: NewsSource): void => {
            const sourceClone: DocumentFragment = cloneTemplate(sourceItemTemp);
            const sourceItem: HTMLButtonElement = getElement<HTMLButtonElement>('.source__item', sourceClone);

            getElement<HTMLElement>('.source__item-name', sourceClone).textContent = item.name;
            sourceItem.dataset.sourceId = item.id;
            sourceItem.title = item.name;

            fragment.append(sourceClone);
        });

        sourcesContainer.replaceChildren(fragment);
    }
}

export default Sources;
