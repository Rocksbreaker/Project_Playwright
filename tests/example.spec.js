// @ts-check
import { test, expect } from '@playwright/test';
import { Sample } from '../pages/sample';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.only('Broken links', async ({ page,request }) => {
  await page.goto('https://demoqa.com/broken');
  const links = await page.locator('a').all();
  for(const link of links){
    const url = await link.getAttribute('href');
    if(url && url.startsWith('http')){
      const response = await request.get(url);
      console.log(url,response.status());
      expect(response.status()).toBeLessThan(400);
    }
  }
});

test("Broken Image",async({page})=>{
  await page.goto('https://demoqa.com/broken');
  const BrokenImage = [];
  const images = await page.locator('img').all();
  for(const img of images){
    const src = await img.getAttribute('src');
    const isBroken = await img.evaluate((image)=>image.naturalWidth === 0);
    if(isBroken){
      BrokenImage.push(src)
    }
  }
  expect(BrokenImage.length).toBe(0)
})

test("Download the file and save in specific path",async({page})=>{
  // test.setTimeout(40000)
  await page.goto("https://demoqa.com/upload-download");
  // await page.waitForLoadState("networkidle")
  //Wait for download event
 const downloadPromise = await page.waitForEvent('download');
 await page.locator("#downloadButton").click();
 const download = await downloadPromise;
 //Validating file name
 const fileName = await download.suggestedFilename();
 expect(fileName).toBe("sampleFile.jpeg")
//Storing file in local folder
 await download.saveAs(`./downloads/${fileName}`)

});

test("Upload multiple files",async({page})=>{
  await page.goto("https://demoqa.com/upload-download");
  const file1 = "./downloads/sampleFile.jpeg";
const file2 = "./downloads/sampleFile.jpeg";
  await page.locator("#uploadFile").setInputFiles(file1);
  // await page.locator("#uploadFile").setInputFiles([file1, file2]);
  await page.waitForTimeout(5000)
});

test("iframes and nested iframes", async({page})=>{
await page.goto("https://demoqa.com/frames");
//iframe
const frameA = await page.frameLocator("#frame1");
await frameA.locator("#sampleHeading").click();
await expect(await frameA.locator("#sampleHeading")).toBeVisible();
//Nested iframes
await page.goto("https://demoqa.com/nestedframes");
const frame1 = await page.frameLocator("#frame1");
const frame2 = await frame1.frameLocator('iframe').first();
await frame1.getByText("Parent frame").click();
await expect (await frame1.getByText("Parent frame")).toBeVisible();
await frame2.getByText("Child Iframe").click();
await expect(await frame2.getByText("Child Iframe")).toBeVisible();
});

test("Model Dialogs", async({page})=>{
await page.goto("https://demoqa.com/modal-dialogs");
//samll dialog
await page.getByRole("button", {name: "Small modal"}).click();
await expect(await page.locator("#example-modal-sizes-title-sm")).toBeVisible();
await expect(await page.getByText("This is a small modal. It has very less content")).toBeVisible();
await page.locator("#closeSmallModal").click();
});

test("Alerts, prompt", async({page})=>{
await page.goto("https://demoqa.com/alerts");
//Alert
await page.waitForTimeout(3000);
await page.getByRole("button", {name:"Click me"}).first().click(); 
await page.on('dialog', async dialog =>{ 
console.log(dialog.message());
 await dialog.accept();
}) 

// Alert 5 seconds and alert validation
const [dialog1] = await Promise.all([
   await page.waitForEvent("dialog"), 
   await page.locator("#timerAlertButton").click() 
  ])

//or
const dialogPromise = await page.waitForEvent('dialog') 
await page.locator("#timerAlertButton").click()
const dialog = await dialogPromise;
console.log(dialog.message());
await dialog.accept();

//Confirm button
await page.locator("#confirmButton").click();
await page.once('dialog', async dialog=>{
console.log(dialog.message());
await dialog.accept();
})

//Prompt button
await page.locator("#promtButton").click();
await page.once('dialog', async dialog=>{
console.log(dialog.message());
await dialog.accept("Wow!!!");
//await dialog.dismiss()
});
await page.waitForTimeout(2000)
 });

 
 test("Browser window, tabs", async({page})=>{
await page.goto("https://demoqa.com/browser-windows");
//new tab
const [newTab] = await Promise.all([
page.waitForEvent('popup'),
page.getByRole("button", {name:"New Tab"}).click()
])
console.log(newTab.url());
await newTab.waitForTimeout(3000);
await page.bringToFront();
await newTab.waitForTimeout (3000);

//new window
const [newwindow] = await Promise.all([
page.waitForEvent("popup"),
page.getByRole("button", {name: "New Window", exact:true}).click()
])
console.log(newwindow.url());

//new window message
const [newwindowMsg] = await Promise.all([
page.waitForEvent("popup"),
page.getByRole("button", {name: "New Window Message", exact: true}).click()
])
await newwindowMsg.on('dialog', async dialog =>{
console.log(dialog.message())
})
expect(await newwindowMsg.getByText("Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.")).toBeVisible({timeout:5000})
await newwindowMsg.waitForTimeout(3000);
console.log(newwindowMsg.url());
});


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

test("Tabel", async({page})=>{
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
const sValue = await page.locator('table tbody tr:nth-child(2) td:nth-child(4)').textContent();
console.log(sValue)
//Print Entire Table Data
for(let i=0; i<count; i++){
const row = await rows.nth(i);
const cell = await row.locator('td').allTextContents();
console.log(cell)
}
//Click Edit Button for Specific Row using text
await page.locator('tr:has-text("Alden") #edit-record-2').click();
await page.waitForTimeout(3000);
//Delete button using nth
await page.getByTitle("Delete").nth(2).click();
});

test("Select options @smoke @regression", async({page})=>{
await page.goto("https://demoqa.com/select-menu");
//React Dropdown
 await page.getByRole("combobox").first().click();
 await page.getByText("A root option").click();

 await page.screenshot({path:'screenshot.png',fullPage:true})

//Old Selection
await page.locator("#oldSelectMenu").selectOption({value:"3"});
await page.waitForTimeout(2000)

//Multiple select
const dropdown = await page.locator("#react-select-12-placeholder");
await dropdown.click()
await dropdown.type("Blue")
await page.keyboard.press("enter");

await dropdown.fill("green");
await page.locator('text=green').click({button:'right'});//right click .dblclick - double click

await page.waitForTimeout(2000)
});

test("Tooltip", async({browser})=>{
  //authentication
 const context = await browser.newContext({
  httpCredentials:{
    username:"admin",
    password: "password"
  }
 })
 const page = await context.newPage();
//authentication in popup
await page.fill("#username","admin");
await page.fill("#password","admin");
await page.click("#Login")


await page.goto("https://demoqa.com/tool-tips");
await page.waitForTimeout(3000)
const hover = await  page.locator("#toolTipButton");
await hover.hover();
expect(hover).toBeVisible();
expect(hover).toHaveText("You hovered over the Button")

});

test("Drag and drop @regression",async({page})=>{
  await page.goto("https://demoqa.com/droppable");
   await page.waitForTimeout(3000)
  const source = await page.locator("#draggable")
  const target = await page.getByRole("tabpanel",{name:"Simple"}).locator("#droppable")
  await source.dragTo(target);
  await page.waitForTimeout(3000)
//validate draged item in drop space
expect(target).toHaveText("Dropped!")

  // Validate CSS
  // expect(target).toHaveCSS("color","rgb(233,234,233)")
})

// test.beforeAll(async()=>{

// })

test("Xpath",async({page})=>{
await page.goto("https://demoqa.com/accordian");
await page.waitForTimeout(3000);
await page.locator('//*[@id="accordianContainer"]/div/div[1]/div/div/p').click({button:"left"});
});

test("Tabs",async({page})=>{
await page.goto("https://demoqa.com/tabs");
await page.waitForTimeout(3000);
await page.getByRole("tab",{name:"Origin"}).click();
const tabs = await page.getByRole("tab").all();
for(const tab of tabs){
  console.log(tab)
;}
await page.waitForTimeout(3000);
});

test("Visual Testing", async({page})=>{
const sample = new Sample(page);
await page.goto("https://demoqa.com/webtables");
await page.waitForTimeout(3000);
await sample.btnClick();
await sample.firstnameFill("Aswin")
await page.waitForTimeout(3000);
// expect(page).toHaveScreenshot('image.png')

});

//API Mocking
test("API Mocking", async({page})=>{
  await page.goto("https://demoqa.com/automation-practice-form");
  await page.waitForTimeout(3000);
  await page.route("**/submit", route =>{
    route.fulfill({
      status:200,
      contentType:"application/json",
      body: JSON.stringify({message:"Form submitted successfully"})
    })
  })
  await page.locator("#firstName").fill("Rama");
  await page.locator("#lastName").fill("Rajan");
  await page.getByPlaceholder("name@example.com").fill("rama.rajan@example.com");
  await page.locator("#userNumber").fill("1234567890");
  await page.locator("#currentAddress").fill("123 Main Street");
  await page.locator("#submit").click();
});



 