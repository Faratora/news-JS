import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { getElement } from '../../utils/dom';
import type { ArticlesResponse, SourcesResponse } from '../../types/news-api';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    private readonly mobileQuery: MediaQueryList;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.mobileQuery = window.matchMedia('(max-width: 760px)');
    }

    public start(): void {
        const sourcesContainer: HTMLElement = getElement<HTMLElement>('.sources');
        const sourcesSection: HTMLElement = getElement<HTMLElement>('.section_sources');
        const sourcesToggle: HTMLButtonElement = getElement<HTMLButtonElement>('.sources-toggle');

        sourcesToggle.addEventListener('click', (): void => {
            this.setSourcesMenuOpen(sourcesSection, sourcesToggle, !this.isSourcesMenuOpen(sourcesSection));
        });

        sourcesContainer.addEventListener('click', (event: MouseEvent): void => {
            const target: EventTarget | null = event.target;

            if (target instanceof HTMLElement && target.closest('.source__item')) {
                this.setSourcesMenuOpen(sourcesSection, sourcesToggle, false);
            }

            this.controller.getNews(event, (data: ArticlesResponse): void => {
                this.view.drawNews(data);
            });
        });

        document.addEventListener('keydown', (event: KeyboardEvent): void => {
            if (event.key !== 'Escape' || !this.isSourcesMenuOpen(sourcesSection)) {
                return;
            }

            this.setSourcesMenuOpen(sourcesSection, sourcesToggle, false);
            sourcesToggle.focus();
        });

        this.mobileQuery.addEventListener('change', (event: MediaQueryListEvent): void => {
            if (!event.matches) {
                this.setSourcesMenuOpen(sourcesSection, sourcesToggle, false);
            }
        });

        this.controller.getSources((data: SourcesResponse): void => {
            this.view.drawSources(data);
        });
    }

    private isSourcesMenuOpen(sourcesSection: HTMLElement): boolean {
        return sourcesSection.classList.contains('section_sources_open');
    }

    private setSourcesMenuOpen(sourcesSection: HTMLElement, sourcesToggle: HTMLButtonElement, isOpen: boolean): void {
        sourcesSection.classList.toggle('section_sources_open', isOpen);
        sourcesToggle.setAttribute('aria-expanded', String(isOpen));
        sourcesToggle.setAttribute('aria-label', isOpen ? 'Закрыть список источников' : 'Открыть список источников');
        document.documentElement.classList.toggle('sources-menu-open', isOpen);
    }
}

export default App;
