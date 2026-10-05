import { test, expect } from '@playwright/test'
import { mainHeaderPage } from '../../../../pages/mainHeaderPage.js';
import { data } from '../../../../utils/dataTranslation.js';
import { TranslationPage } from '../../../../pages/translationPage.js';
import { validateTranslation } from '../../../../helpers/verifiedTranslation.ts'

test.describe('Testing translation to spanish in english', () => {
    // the project I am using, has a web-portal who has a translation feature, but this translation can vary according to the AI reply.
    test.beforeEach(async ({ page }) => {
        const mainPage = new mainHeaderPage(page)

        await page.goto('https://web-site-testing-pw.web.app/lexio');
        await expect(mainPage.linkPageLexio).toBeVisible()
        await mainPage.ClickTranslatorHeader()
    })
    test('Translation language into different options', async ({ page }) => {
        const translationPage = new TranslationPage(page);
        for (const testData of data) {
            await test.step(`Translate: ${testData.source}`, async () => {
                await translationPage.fillTranslationText(testData.source);
                console.log('Expected:', testData.expectedMeaning1);
            })
            await test.step(`Expecting translation: ${testData.expectedMeaning1} or ${testData.expectedMeaning2} or ${testData.expectedMeaning3}`, async () => {
                console.log('Expected:', testData.expectedMeaning1);
                console.log('Expected 2:', testData.expectedMeaning2);
                console.log('Expected 3:', testData.expectedMeaning3);

                const textTranslation = await translationPage.extractTranslationText();
                console.log(textTranslation)
                validateTranslation(textTranslation)


            })
            

        }
    })



})
