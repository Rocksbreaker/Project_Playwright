import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
 test("Form", async({page})=>{
 await page.goto("https://demoqa.com/automation-practice-form");
 await page.locator("#firstName").fill("Rama");
 await page.locator("#lastName").fill("Rajan");
 await page.getByPlaceholder("name@example.com").type("abc@gmail.com");
 //
 // await page.locator("#dateOfBirthInput").fill("11 Mar 2026")
 //
 await page.locator("#dateOfBirthInput").click();
 await page.locator(".react-datepicker__month-select").selectOption("April")
 await page.getByText("13",{exact:true}).click()
 
 await page.getByRole("radio", {name:"Male", exact:true}).click();
 await page.getByPlaceholder ("Mobile Number").fill("9876543210");
 await page.getByLabel("Sports").check();
 await page.getByLabel("Reading").check();
 await page.locator('input[type="file"]').setInputFiles("./downloads/sampleFile.jpeg");
 await page.getByPlaceholder("Current Address").fill("dwwedwedw");
 await page.locator('#react-select-3-input').fill('NCR');
 await page.keyboard.press("Tab");
 });
});
