import { test, expect} from "@playwright/test"
import {Sample} from "../pages/sample.js"
import * as testData from "../testdata/saucedemo-testdata.json"
//Broken Links
test("Broken Links",async({page, request})=>{
await page.goto("https://demoqa.com/broken")
const links = await page.locator("a").all();
for(const link of links){
    const url = await link.getAttribute("href");
    if(url && url.startsWith('http')){
        const response = await request.get(url);
        console.log("URL is ",url + " response code is ",response.status());
        await expect(response.status()).toBeLessThan(400)
    }
}
})

//Broken Images
test("Broken Images",async({page,request})=>{
    await page.goto("https://demoqa.com/broken");
    const img = await page.locator('img').all();
    const BrokenImages = []
    for(const images of img){
        const src = await images.getAttribute('src')
        const isBroken = await images.evaluate((image)=>{
             return image && image.naturalWidth === 0
        })
        if(isBroken){
            BrokenImages.push(src)
            console.log("Broken Image: ",src)
        }
    }
    await expect(BrokenImages.length).toBe(0)
})

//Download the file and save in specific path
test("Download the file and save in specific path",async({page})=>{
    await page.goto("https://demoqa.com/upload-download")
    const downloadPromise = await page.waitForEvent('download');
    await page.getByRole("button",{name:"Download"}).click();
    const download = await downloadPromise;
    //Validate file name
    const filename = await download.suggestedFilename();
    await expect(filename).toBe('sampleFile.jpeg')
    //Store in specific location
    await download.saveAs(`./downloads/${filename}`)
})

//Single and multifile upload
test("Single and multifile upload",async({page})=>{
    await page.goto("https://demoqa.com/upload-download");
    const file1 = './downloads/sampleFile.jpeg';
    const file2 = 'screenshot.png'
    await page.locator("#uploadFile").setInputFiles(file1);
    // await page.locator("#uploadFile").setInputFiles([file1, file2])
})

//iframes and nested iframes
test("iframes and nested iframes",async({page})=>{
    await page.goto('https://demoqa.com/frames')
    const frame1 = await page.frameLocator('#frame1');
    const frameText = await frame1.locator('#sampleHeading');
    await expect(frameText).toHaveText("This is a sample page")
    //Nested iframe
    await page.goto("https://demoqa.com/nestedframes");
    const nestedFrame = await page.frameLocator("#frame1");
    const childFrame = await nestedFrame.frameLocator('iframe').first();
    await expect(await nestedFrame.getByText('Parent frame')).toBeVisible();
    await expect(await childFrame.getByText('Child Iframe')).toBeVisible();
})

//Dialog box
test("Model Dialogs", async({page})=>{
await page.goto("https://www.leafground.com/alert.xhtml;jsessionid=node01k33hnnh1h6iuqxcnkvaotdxd19859531.node0");
//small dialog
await page.once('dialog',async dialog=>{
    console.log(dialog.message());
    await dialog.accept()
})
await page.locator('button[name="j_idt88:j_idt91"]').click();

//confirm dialog
await page.once('dialog',async dialog=>{
console.log(dialog.message());
await dialog.accept();
})
await page.locator('button[name="j_idt88:j_idt93"]').click();


await page.locator('button[name="j_idt88:j_idt100"]').click();
await expect(await page.locator('#j_idt88\\:j_idt101')).toBeVisible();
await expect(await page.getByRole("dialog",{name:"Modal Dialog (Sweet Alert)"})).toBeVisible();


await page.on('dialog',async dialog=>{
console.log(dialog.message());
await dialog.accept('Hi')
})
await page.locator("#j_idt88\\:j_idt104").click();

})

 test("Browser window, tabs", async({page})=>{
await page.goto("https://demoqa.com/browser-windows");
//new tab
const [newTab] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button',{name:"New Tab"}).click()
]);
console.log(newTab.url())
await newTab.close();

//new window
const [newWindow] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('button',{name:'New Window',exact:true}).click()
])
await newWindow.bringToFront();

//New window message
const [newWindowMsg] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole("button",{name:"New Window Message",exact:true}).click()
]);
await newWindowMsg.on('dialog',async dialog=>{
    console.log(dialog.message())
})

await expect(await newWindowMsg.getByText("Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.")).toBeVisible({timeout:5000})

 })

 test("Form", async({page})=>{
await page.goto("https://demoqa.com/automation-practice-form");
await page.getByRole('textbox').first().fill('Aswin');
await page.getByPlaceholder("Last Name").fill("ganesh");
await page.getByPlaceholder("name@example.com").fill("aswin@gmail.com");
await page.getByRole('radio',{name:"Male",exact:true}).click();
await page.locator("#userNumber").fill("1234567890");
await page.locator("#dateOfBirthInput").click();
await page.locator(".react-datepicker__month-select").selectOption({name:"January"});
await page.locator('.react-datepicker__year-select').selectOption({value:"2022"});
await page.locator("#subjectsInput").type("M");
await page.getByText("Maths").click();
await page.locator("#subjectsInput").type("A");
await page.getByText("Arts").click();
await page.getByLabel("Sports").check();
await page.getByLabel("Reading").check();
await page.locator('#uploadPicture').setInputFiles('screenshot.png')
await page.getByPlaceholder("Current Address").fill("sdasd")

await page.locator("#react-select-3-input").fill("haryana");
await page.getByRole("option",{name:"Haryana"}).click();
await expect(await page.getByText('Select City')).toBeEnabled();
await page.keyboard.press('Tab');
await page.keyboard.press('Enter')
 });

 test("Tabel", async({page})=>{
await page.goto("https://demoqa.com/webtables");
await page.waitForTimeout(3000);
//Get All Rows Count
const rows = await page.locator('table tbody tr');
const count = await rows.count()
console.log(count)
//Get All Column Values
const columns = await page.locator('table thead th').count()
console.log(columns)
//Get Specific Cell Value
const SV = await page.locator('table tbody tr:nth-child(2) td:nth-child(3)').textContent();
console.log(SV)
const SV2 = await page.locator("table tbody tr:nth-child(1) td:nth-child(2)").textContent();
console.log(SV2)
//Print Entire Table Data
for(let i = 1; i<=count; i++){
    let row = await page.locator("table tbody tr").nth(i);
    let cell = await row.locator('td').allTextContents();
    console.log(cell)
}
//Click Edit Button for Specific Row using text
await page.locator('table tbody tr:has-text("Alden") #edit-record-2').click()
await page.waitForTimeout(3000);
//Delete button using nth
await page.getByTitle("Delete").nth(2).click()
const name = await page.locator('table tbody tr:has-text("Alden")');
await name.getByTitle("Delete").click();

//To get the salary of Alden
const salary = await page.locator('table tbody tr:has-text("Alden") td:nth-child(5)').textContent()
console.log(salary)
});

test("Select options @smoke @regression", async({page})=>{
await page.goto("https://demoqa.com/select-menu");
// //React Dropdown
// await page.getByRole("combobox").first().click();
//  await page.getByText("A root option").click();

//  //Old Selection
// await page.locator("#oldSelectMenu").selectOption({value:"5"})
// await page.waitForTimeout(2000)

//Multiple select
const dropdown = await page.locator("#react-select-4-input");
await dropdown.click()
await dropdown.fill("red");
// if(await page.locator("text=Red").isVisible()){
await page.keyboard.press("Enter");
// }

await dropdown.fill("blue");
await page.keyboard.press("Enter");
await dropdown.fill("green");
await page.locator("text=Green").click();

// await page.locator("#react-select-4-input").dblclick({button:'right'})

await page.waitForTimeout(2000)
});

test("Tooltip and http authentication",async({browser})=>{
    const context = await browser.newContext({
        httpCredentials:{
            username:"admin",
            password: "password"
        }
    })
    const page = await context.newPage();
    // //authentication in popup
    // await page.fill("#usename","name")
    // await page.fill("#password","pass")
    // await page.click("#Login")
    
  await page.goto("https://demoqa.com/tool-tips");
await page.waitForTimeout(3000)
const hover = await  page.locator("#toolTipButton");
await hover.hover();
 expect(hover).toBeVisible();
expect(hover).toHaveText("You hovered over the Button")

const two = await page.getByRole("link",{name:"Contrary"});
await two.hover();
await expect(two).toBeVisible();
await expect(two).toHaveText("You hovered over the Contrary");
})

test("Drag and drop, tab",async({page})=>{
  await page.goto("https://demoqa.com/droppable");
   await page.waitForTimeout(3000)
    // const source = await page.locator("#draggable");
    // const target = await page.getByText("Drop Here",{exact:true});
    // await source.dragTo(target);

    // await page.waitForTimeout(3000)

    await page.getByRole('tab',{name:"Prevent Propogation"}).click();
    const drag = await page.locator("#dragBox");
    const innerDrop = await page.locator("#notGreedyInnerDropBox")
    await drag.dragTo(innerDrop)
     await expect(innerDrop).toHaveText("Dropped!")
     await expect(innerDrop).toHaveCSS("background-color","rgb(70, 130, 180)")
     await expect(innerDrop).toHaveCSS("text-align","center")

});

test("Xpath",async({page})=>{
await page.goto("https://demoqa.com/accordian");
await page.waitForTimeout(3000);
await page.locator('xpath=//*[@id="accordianContainer"]/div/div[2]/h2/button').click({button:"left"})
});

test("Tabs",async({page})=>{
await page.goto("https://demoqa.com/tabs");
await page.waitForTimeout(3000);
const tabs = await page.getByRole("tab").all();
for(const tab of tabs){
    if(await tab.isDisabled()){
        const text = await tab.textContent();
console.log(text," is disabled ")
    }else{
    await tab.click();
    const text = await tab.textContent();
    console.log(text)
    }

}
});

test("Visual Testing", async({page})=>{
const sample = new Sample(page)
await page.goto("https://demoqa.com/webtables");
await page.waitForTimeout(3000);
await sample.btnClick();
//expect(page).toHaveScreenshot('screenshot.png')

});

//API Mocking
test("API Mocking", async({page})=>{
  await page.goto("https://demoqa.com/automation-practice-form");
  await page.waitForTimeout(3000);
  await page.route("**/submit",route=>{
    route.fullfill({
        status:200,
        contentType: "application/json",
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

test('Mock API response', async ({ page, request }) => {
await page.route("https://reqres.in/api/users?page=2",route=>{
  route.fulfill({
    status: 200,
    contentType:"application/json",
    body: JSON.stringify({
      data:[{
        id:345,
        first_name:"Aswin",
        last_name:"Tester"
      }
      ]
    })
  }) 
})
const response = await request.get("https://reqres.in/api/users?page=2");
// await expect(response.status()).toBe(200);
const body = await response.json();
console.log(body)
});

// //Handling dynamic elements
// await page.locator('.item').first().click();
// await page.locator('.item').nth(1).dblclick();
// await page.locator('.item').last().click();


// //Chaining Locators
// await page.locator("#locator").getByRole("button").click();
// //or
// await page.locator("#locator >> text=Submit").click();

// await page.locator("#searchBox").getByRole("button",{name:"Search"}).click();
// await page.locator(".movie-card").filter({hasText:"Inception"}).getByRole('button',{name:"Watch Now"}).click();
// await page.locator('tr').filter({hasText:"Kumar"}).getByRole("button",{name:"Approve"});
// await page.getByRole("dialog").locator('.footer').getByRole("button",{name:"Update"})
// await page.locator(".course-card").filter({hasText:"Playwright"}).getByRole("button",{name:"View Details"})

//Tooltip title
test("tooltip and attribute",async({page})=>{
  //<button title="Click to Login">Login</button>
await expect(await page.getByRole("button",{name:"Login"})).toHaveAttribute("title","Click to Login")

// <div class="icon">ℹ</div>
// <div class="tooltip">User Information</div>
await page.locator(".icon").hover({force:true});
await expect(await page.locator(".tooltip")).toBeVisible();
await expect(await page.locator(".tooltip")).toHaveText("User Information")

//If Tooltip Disappears Quickly
await page.locator(".icon").hover({force:true});
//or
await expect(await page.locator(".tooltip")).toBeVisible();
await expect(await page.locator(".tooltip")).toHaveText("User Information")
})


test("tooltip andd attribute",async({page})=>{
  const sample = new Sample(page)
  await page.goto(testData.url);
  await sample.userNameFill(testData.username)
})