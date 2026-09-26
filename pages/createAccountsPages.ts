import {type Locator, type Page} from '@playwright/test'

export class createAccountPage {
    readonly page: Page;
    readonly linkPageLexio: Locator;
    readonly createAccountButton: Locator;
    readonly fullNameForms: Locator;
    readonly emailForms: Locator;
    readonly planSelectForms: Locator;
    readonly countrySelectForms: Locator;
    readonly dropdownCountry: Locator;
    readonly ColombiaOption: Locator;
    readonly PeruOption: Locator;
    readonly checkBoxCountry: Locator;
    readonly buttonCreateAccount: Locator;
    readonly validationIdCreate: Locator;

    readonly messageFullNameIncorrectly: Locator;
    readonly messageEmailIncorrectly: Locator;
    readonly messagePlanIncorrectly: Locator;
    readonly messageCountryIncorrectly: Locator;
    readonly messageTermsIncorrectly: Locator;

    constructor(page:Page) {
        this.page = page;
        this.linkPageLexio = page.getByRole('link', { name: 'Lexio', exact: true })
        this.createAccountButton = page.getByRole('link', { name: 'Create your account', exact: true });
        this.fullNameForms = page.getByRole('textbox', { name: 'Full name' });
        this.emailForms = page.getByRole('textbox', { name: 'Email' })
        this.planSelectForms = page.getByLabel('Plan')
        this.countrySelectForms = page.getByText('Select your country');
        this.dropdownCountry = page.locator('div[style*="overflow-y: auto"]').first();

        //options
        this.ColombiaOption = page.locator('[data-value="Colombia"]');
        this.PeruOption = page.locator('[data-value="Peru"]'); //HOLA MUNDO: recordar mirar como podemos optimizar esto con --envs para entrevistas xd.

        this.checkBoxCountry = page.getByRole('checkbox', { name: 'I accept the terms of service' });
        this.buttonCreateAccount = page.getByRole('button', { name: 'Create account' });

        this.validationIdCreate = page.getByRole('status').getByText('Account created. Reference ');

        // error messages
        this.messageFullNameIncorrectly = page.getByText('Enter at least 2 characters');
        this.messageEmailIncorrectly = page.getByText('Enter a valid email');
        this.messagePlanIncorrectly = page.getByText('Choose a plan');
        this.messageCountryIncorrectly = page.getByText('Choose a country');
        this.messageTermsIncorrectly = page.getByText('You must accept the terms');

    }

    async ClickCreateButton(){
        await this.createAccountButton.click()
    }

    async filledFormsAccount(){
        await this.fullNameForms.fill('Alejo');
        await this.emailForms.fill('alejo@correo.com')
        await this.planSelectForms.selectOption('Free');
        await this.countrySelectForms.click()
        await this.dropdownCountry.evaluate(el => el.scrollTop = 800);
        await this.ColombiaOption.click()
        await this.checkBoxCountry.check()
        await this.buttonCreateAccount.click()
    }
    async uncompleteFilledFormsAccount(){
        await this.fullNameForms.fill('A');
        await this.emailForms.fill('alejo.com')
        await this.buttonCreateAccount.click()
    }
    async incorrectFilledFormsAccount(){
        await this.fullNameForms.fill('56546');
        await this.emailForms.fill('&//&.com')
        await this.planSelectForms.selectOption('Free');
        await this.countrySelectForms.click()
        await this.dropdownCountry.evaluate(el => el.scrollTop = 800);
        await this.ColombiaOption.click()
        await this.checkBoxCountry.check()
        await this.buttonCreateAccount.click()
    }
}