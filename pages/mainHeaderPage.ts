import {type Locator, type Page} from '@playwright/test'

export class mainHeaderPage {
    readonly createAccountButton: Locator;
    readonly linkPageLexio: Locator;
    readonly translationHeader: Locator;

    constructor(page:Page) {
        this.linkPageLexio = page.getByRole('link', { name: 'Lexio', exact: true })
        this.createAccountButton = page.getByRole('link', { name: 'Create your account', exact: true });
        this.translationHeader = page.getByRole('link', { name: 'Translator', exact: true });

    }

    async ClickCreateButton(){
        await this.createAccountButton.click()
    }
    async ClickTranslatorHeader(){
        await this.translationHeader.click()
    }

}