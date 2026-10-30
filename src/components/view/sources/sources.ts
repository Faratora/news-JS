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
            const sourceItem: HTMLElement = getElement<HTMLElement>('.source__item', sourceClone);

            getElement<HTMLElement>('.source__item-name', sourceClone).textContent = item.name;
            sourceItem.dataset.sourceId = item.id;

            fragment.append(sourceClone);
        });

        sourcesContainer.replaceChildren(fragment);
    }
}

export default Sources;
