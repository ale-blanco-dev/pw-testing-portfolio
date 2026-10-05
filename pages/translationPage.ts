import { type Locator, type Page } from '@playwright/test';
import { test, expect } from '@playwright/test'

export class TranslationPage {
    textBoxTranslate: Locator;
    translationExpectedText: Locator;
    selectLanguageDropdown: Locator;
    buttonTranslate: Locator;

    constructor(page: Page) {
        this.textBoxTranslate = page.getByRole('textbox', {
            name: 'Type text to translate…'
        });
        this.translationExpectedText = page.getByTestId('translation-result')
        this.selectLanguageDropdown = page.getByLabel('Into')
        this.buttonTranslate = page.getByRole('button',{name:'Translate'})
    }

    async fillTranslationText(sourceWord: string) {
        await this.textBoxTranslate.fill(sourceWord);
        await this.selectLanguageDropdown.selectOption('English')
        await this.buttonTranslate.click();

    }
    
    async extractTranslationText(){
        await expect(this.translationExpectedText).toBeVisible();
        return (await this.translationExpectedText.innerText()).toLowerCase();
    }
}