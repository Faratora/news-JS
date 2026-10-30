import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { getElement } from '../../utils/dom';
import type { ArticlesResponse, SourcesResponse } from '../../types/news-api';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesContainer: HTMLElement = getElement<HTMLElement>('.sources');

        sourcesContainer.addEventListener('click', (event: MouseEvent): void => {
            this.controller.getNews(event, (data: ArticlesResponse): void => {
                this.view.drawNews(data);
            });
        });

        this.controller.getSources((data: SourcesResponse): void => {
            this.view.drawSources(data);
        });
    }
}

export default App;
