import './news.css';
import { cloneTemplate, getElement } from '../../../utils/dom';
import type { NewsArticle } from '../../../types/news-api';

class News {
    private static readonly MAX_ARTICLES: number = 10;

    public draw(data: ReadonlyArray<NewsArticle>): void {
        const news: ReadonlyArray<NewsArticle> = data.slice(0, News.MAX_ARTICLES);
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = getElement<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer: HTMLElement = getElement<HTMLElement>('.news');

        news.forEach((item: NewsArticle): void => {
            const newsClone: DocumentFragment = cloneTemplate(newsItemTemp);
            const newsItem: HTMLElement = getElement<HTMLElement>('.news__item', newsClone);
            const photo: HTMLElement = getElement<HTMLElement>('.news__meta-photo', newsClone);

            if (item.urlToImage) {
                photo.style.backgroundImage = `url(${item.urlToImage})`;
            } else {
                photo.classList.add('news__meta-photo_empty');
            }

            getElement<HTMLElement>('.news__meta-author', newsClone).textContent = item.author ?? item.source.name;
            getElement<HTMLElement>('.news__meta-date', newsClone).textContent = this.formatDate(item.publishedAt);
            getElement<HTMLElement>('.news__description-title', newsClone).textContent = item.title;
            getElement<HTMLElement>('.news__description-source', newsClone).textContent = item.source.name;
            getElement<HTMLElement>('.news__description-content', newsClone).textContent = item.description ?? '';
            getElement<HTMLAnchorElement>('.news__read-more a', newsClone).href = item.url;

            newsItem.classList.add('news__item_visible');
            fragment.append(newsClone);
        });

        newsContainer.replaceChildren(fragment);
    }

    private formatDate(value: string): string {
        return value.slice(0, 10).split('-').reverse().join('.');
    }
}

export default News;
