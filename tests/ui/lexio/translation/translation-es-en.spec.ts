import { test, expect } from '@playwright/test'
import { mainHeaderPage } from '../../../../pages/mainHeaderPage';

test.describe('Testing translation to spanish in english', () => {
    // the project I am using, has a web-portal who has a translation feature, but this translation can vary according to the AI reply.
    test.beforeAll(async ({ page }) => {
        const mainPage = new mainHeaderPage(page)

        await page.goto('https://web-site-testing-pw.web.app/lexio');
        await expect(mainPage.linkPageLexio).toBeVisible()
        await mainPage.ClickTranslatorHeader()
    })


})
