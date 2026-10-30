import AppLoader from './appLoader';
import { API_ENDPOINTS } from '../../config/api';
import type { ArticlesResponse, Callback, SourcesResponse } from '../../types/news-api';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp<SourcesResponse>(
            {
                endpoint: API_ENDPOINTS.sources,
            },
            callback
        );
    }

    public getNews(event: MouseEvent, callback: Callback<ArticlesResponse>): void {
        const target: EventTarget | null = event.target;
        const newsContainer: EventTarget | null = event.currentTarget;

        if (!(target instanceof HTMLElement) || !(newsContainer instanceof HTMLElement)) {
            return;
        }

        let current: HTMLElement | null = target;
        const sourceItems: NodeListOf<HTMLElement> = newsContainer.querySelectorAll<HTMLElement>('.source__item');

        while (current && current !== newsContainer) {
            if (current.classList.contains('source__item')) {
                const sourceId: string | null = current.getAttribute('data-source-id');

                sourceItems.forEach((item: HTMLElement): void => {
                    const isActive: boolean = item === current;

                    item.classList.toggle('source__item_active', isActive);
                    item.setAttribute('aria-pressed', String(isActive));
                });

                const sourcesSection: HTMLElement | null = newsContainer.closest<HTMLElement>('.section_sources');
                const sourcesToggle: HTMLButtonElement | null =
                    sourcesSection?.querySelector<HTMLButtonElement>('.sources-toggle') ?? null;

                if (sourcesSection && sourcesToggle) {
                    sourcesSection.classList.remove('section_sources_open');
                    sourcesToggle.setAttribute('aria-expanded', 'false');
                    sourcesToggle.setAttribute('aria-label', 'Открыть список источников');
                }

                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<ArticlesResponse>(
                        {
                            endpoint: API_ENDPOINTS.news,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            current = current.parentElement;
        }
    }
}

export default AppController;
