import { test, expect } from '@playwright/test'
import { verifiedUUID  } from '../../../../helpers/verified';
import { createAccountPage } from '../../../../pages/createAccountsPages';
import { mainHeaderPage } from '../../../../pages/mainHeaderPage';

test.describe('Submit the form with all valid fields succeed', () => {
    test.beforeEach(async ({ page }) => {
        const mainPage = new mainHeaderPage(page)

        await page.goto('https://web-site-testing-pw.web.app/lexio');
        await expect(mainPage.linkPageLexio).toBeVisible()
        await mainPage.ClickCreateButton()
    })

    test('Fill the form with all valid fields succeeds', async ({ page }) => {
        const accountPage = new createAccountPage(page);
        await test.step('filled all the fields correcty', async () => {
            await accountPage.filledFormsAccount();
        })
        await test.step('validate creation of new account according to a new id', async () => {
            await expect(accountPage.validationIdCreate.getByRole('code')).toHaveText(verifiedUUID);
        })
    })
    test('Try to submit the form with incomplete fields', async ({ page }) => {
        const accountPage = new createAccountPage(page);
        await test.step('uncomplete fields incorrectly', async () => {
            await accountPage.uncompleteFilledFormsAccount();
        })
        await test.step('validate all the error messages', async () => {
            await expect(accountPage.messageFullNameIncorrectly).toBeVisible()
            await expect(accountPage.messageEmailIncorrectly).toBeVisible()
            await expect(accountPage.messagePlanIncorrectly).toBeVisible()
            await expect(accountPage.messageCountryIncorrectly).toBeVisible()
            await expect(accountPage.messageTermsIncorrectly).toBeVisible()
        })
    })
    test.fail('try to submit the form with incorrect values', async ({ page }) => {
        const accountPage = new createAccountPage(page);
        await test.step('uncomplete fields incorrectly', async () => {
            await accountPage.incorrectFilledFormsAccount();
        })
        await test.step('validate all the error messages', async () => {
            await expect(accountPage.messageFullNameIncorrectly).toBeVisible()
            await expect(accountPage.messageEmailIncorrectly).toBeVisible()
        })
    })
    
})






