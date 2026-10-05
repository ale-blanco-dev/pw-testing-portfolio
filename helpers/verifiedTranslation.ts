import { data } from "../utils/dataTranslation.js";
import { test, expect } from '@playwright/test'
import { TranslationPage } from '../pages/translationPage.js'

//const TranslationPages = new TranslationPage(page)

//textTranslation = await TranslationPages.translationExpectedText.innerText();

export function validateTranslation(textTranslation: string) {
for (const testData of data) {
    const expectedMeanings: string[] = [testData.expectedMeaning1, testData.expectedMeaning2, testData.expectedMeaning3]

    const isValid: boolean = expectedMeanings.some((elem) => elem === textTranslation)
    if (isValid) console.log('Si, encontraste')
}
}
