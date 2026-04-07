import {test, expect} from "@playwright/test";

// test("Validating the Broken links", async({page,request})=>{
//     await page.goto("https://demoqa.com/broken");
//     await page.waitForLoadState("networkidle");
//     const links = await page.locator("a").all();
//     for(const link of links){
//         const url = await link.getAttribute("href");
//         if(url && url.startsWith('http')){
//             let response = await request.get(url);
//             console.log(url," : ",response.status());
//             expect(response.status()).toBeLessThan(400)
//         }
//     }
// })


// test("Broken Image",async({page})=>{
//   await page.goto('https://demoqa.com/broken');
//   const brokenImage = [];
//   const images = await page.locator("img").all();
//   for(const image of images){
//     const src = await image.getAttribute("src");
//     const isBroken = await image.evaluate((image)=> image.complete && image.naturalWidth === 0);
//     if(isBroken){
//         brokenImage.push(src);
//     }
//   }  
//   expect(brokenImage.length).toBe(0)

// });

// test("Download the file and save in specific path",async({page})=>{
//   // test.setTimeout(40000)
//   await page.goto("https://demoqa.com/upload-download");
//   const downloadPromise = await page.waitForEvent('download');
//   await page.locator("#downloadButton").click();
//   const download = await downloadPromise;

//   const filename = await download.suggestedFilename();
//   expect(filename).toContain(".jpeg")

//   await download.saveAs(`./downloads/${filename}`)
// });

// test("Upload multiple files",async({page})=>{
//   await page.goto("https://demoqa.com/upload-download");
//   const file1 = "./downloads/sampleFile.jpeg";
// const file2 = "./downloads/sampleFile.jpeg";
//   await page.locator("#uploadFile").setInputFiles(file1);
//   // await page.locator("#uploadFile").setInputFiles([file1, file2]);
//   await page.waitForTimeout(5000)
// });

// test("iframes and nested iframes", async({page})=>{
// await page.goto("https://demoqa.com/frames");
// //iframe
// const frameA = await page.frameLocator("#frame1");
// await frameA.locator("#sampleHeading").click();
// await expect(await frameA.locator("#sampleHeading")).toBeVisible();
// //Nested iframes
// await page.goto("https://demoqa.com/nestedframes");
// const frame1 = await page.frameLocator("#frame1");
// const frame2 = await frame1.frameLocator('iframe').first();
// await frame1.getByText("Parent frame").click();
// await expect (await frame1.getByText("Parent frame")).toBeVisible();
// await frame2.getByText("Child Iframe").click();
// await expect(await frame2.getByText("Child Iframe")).toBeVisible();
// });

// test("Alerts, prompt", async({page})=>{
// await page.goto("https://demoqa.com/alerts");
// //Alert
// await page.waitForTimeout(3000);
// await page.getByRole("button", {name:"Click me"}).first().click(); 
// await page.on('dialog', async dialog=>{
//     console.log(dialog.message())
//     await dialog.accept();
// })

// // Alert 5 seconds and alert validation
// const [dialogP] = Promise.all([
//     await page.waitForEvent('dialog'),
//     await page.locator("#timerAlertButton").click(),
//     await dialogP.accept()
// ])
   
  

// //or
// const dialogPromise = await page.waitForEvent('dialog')
// await page.locator("#timerAlertButton").click()
// const dialog = await dialogPromise
// console.log(dialog.message());
// await dialog.accept();

// //Confirm button
// await page.locator("#confirmButton").click();
// await page.once('dialog', async dialog=>{
// console.log(dialog.message());
// await dialog.accept();
// })

// //Prompt button
// await page.locator("#promtButton").click();
// await page.once('dialog', async dialog=>{
// console.log(dialog.message());
// await dialog.accept("Wow!!!");
// //await dialog.dismiss()
// });
// await page.waitForTimeout(2000)
 
// }) 

// const [pagePromise] = Promise.all([
//     await page.waitForEvent('popup'),
//     await page.locator("gvh").click()
// ])
// await pagePromise.waitForLoadState('networkidle')

// //Get Specific Cell Value
// const value = await page.locator("table tbody tr:nth-child(2) td:nth-child(3)").textContent();
// expect(value).toBe("hello")

// //Print Entire Table Data
// const row = await page.locator('table tbody tr').count();
// for(i=0; i<row; i++){
// const rows = await row.nth(i);
// const cell = await rows.locator("td").allTextContents();
// console.log(cell)
// }

// //Click Edit Button for Specific Row using text
// await page.locator('tr:has-text("Alen") #editBtn').click();


// //Delete button using nth
// await page.getByTitle("Delete").nth(1).click();


// const [newPage] = await Promise.all([
//     await page.waitForEvent('popup'),
//     await page.getByRole("button",{name:"newPage"}).click()
// ]);
// console.log(newPage.url());
// await newPage.getByLabel("Hello").click();

// const[newWindow] = await Promise.all([
//     await context.waitForEvent('page'),
//     await page.getByRole("button",{name:"newPage"}).click(),
// ])
// await newWindow.on('dialog',async dialog=>{
//     await page.locator("td >> text=Submit").click();
//     await dialog.accept("Hello");
//     await dialog.dismiss("hello")
// })

test.only("Tabel", async({page})=>{
await page.goto("https://demoqa.com/webtables");
await page.waitForTimeout(3000);
//Get All Rows Count
const rows = await page.locator('table tbody tr')
const count = await rows.count()
console.log(count)
//Get All Column Values
const columns = await page.locator('table thead th').count()
  console.log(columns)
//Get Specific Cell Value
const sValue = await page.locator('table tbody tr:nth-child(2) td:nth-child(3)').textContent();
console.log(sValue)
//Print Entire Table Data
for(let i=1; i<= rows; i++){
    const row = await rows.nth(i);
    const cell = await row.getAttribute('td').allTextContents()
    console.log(cell)
}
//Click Edit Button for Specific Row using text
await page.locator('tr:has-text("Alden") #edit-record-2')
await page.waitForTimeout(3000);
//Delete button using nth
await page.getByTitle("Delete").nth(1).click();
});

