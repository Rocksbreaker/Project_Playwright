import {test,expect} from "@playwright/test"
import * as testdata from "../testdata/saucedemo-testdata.json"
import {Login} from "../pages/login"
import { HomePage } from "../pages/dashboard";

// test.describe("Login page testcases",async()=>{

// test.skip("Navigating to the application",async({page,request})=>{
//     const login = new Login(page)
//     await page.goto(testdata.url);
//     await login.login(testdata.username,testdata.paassword);
//     await page.waitForLoadState("networkidle");
//     await expect(await page.getByText("Swagh Labs",{exact:true})).toBeVisible();
//     await expect(page).toHaveURL(testdata.dashboardURL);
//     const response = await page.request.get("https://www.saucedemo.com/manifest.json");
//     await expect(response.status()).toBe(200);
//     await page.on(console);
// })

// test("Navigating to the application 2",async({page,request})=>{
//     const login = new Login(page)

//     const home = new HomePage(page)
//     await page.goto(testdata.url);
//     await login.login(testdata.username,testdata.paassword);
//     await page.waitForLoadState("networkidle");
//     await expect(await page.getByText("Swag Labs",{exact:true})).toBeVisible();
//     await expect(page).toHaveURL(testdata.dashboardURL);
//     const response = await page.request.get("https://www.saucedemo.com/manifest.json");
//     await expect(response.status()).toBe(200);

// ////
//  await expect(await page.locator("#add-to-cart-sauce-labs-backpack").first()).toBeVisible()

// })
// test("Dropdown",async({page})=>{
//  await page.goto("https://the-internet.herokuapp.com/dropdown");
//  await page.waitForLoadState("networkidle")
//  await page.selectOption("#dropdown","1");
//  await page.waitForTimeout(3000)
// });

// test("alert",async({page})=>{
//  await page.goto("https://demoqa.com/alerts");
//  await page.waitForLoadState("networkidle")
// //  await page.getByRole("button",{name:"Click me"}).first().click();
// //  await page.waitForTimeout(3000)
// //  await page.on("dialog", async dialog => {
// //     await dialog.accept()
// //  });
// //  await page.waitForTimeout(3000)
// //   await page.getByRole("button",{name:"Click me"}).nth(1).click();
// //   await page.on("dialog", async dialog =>{
// //     console.log(dialog.message())
// //   })

// //     await page.getByRole("button",{name:"Click me"}).nth(2).click();
// //   await page.on("dialog", async dialog =>{
// //     await dialog.dismiss()
// //   })

//       await page.getByRole("button",{name:"Click me"}).nth(3).click();
//       await page.waitForTimeout(5000)
//   await page.on("dialog", async dialog =>{
//     await dialog.accept("Typing a text")
    
//   })
//   await page.waitForTimeout(3000)


//   const file1 = "./Doc/sampleWebSite.docx"
// const file2 = "./Doc/sampleWebSite.docx"
// await page.setInputFiles("#locator",[file1])
// await page.locator("#hbjk").setInputFiles([file1,file2])
// await page.locator("sd").setInputFiles("./doc/file.pdf")

// //Handling dynamic elements
// await page.locator('.item').first().click();
// await page.locator('.item').nth(1).dblclick();
// await page.locator('.item').last().click();
// });

// //Chaining Locators
// await page.locator("#locator").getByRole("button").click();
// //or
// await page.locator("#locator >> text=Submit").click();
// //Assertion
// await expect(await page.getByLabel("Name")).toBeVisible({timeout:5000});
// await expect.soft(await page.getByLabel("Name")).toBeVisible({timeout:5000});


// await page.selectOption("#locator","option1")
// await page.getByLabel("#locator").selectOption("option1")
// //tooltip
// //<button title="Click to Login">Login</button>
// await expect(await page.getBytitle("Click to Login")).toHaveAttribute("title","Click to Login")

// // <div class="icon">ℹ</div>
// // <div class="tooltip">User Information</div>
// await page.locator(".icon").hover({timeout:5000});
// await expect(await page.locator(".tooltip")).toBeVisible();
// expect (await page.locator(".tooltip")).toHaveText("User Information");

// //If Tooltip Disappears Quickly
// await page.locator("#abcw").hover({force:true});
// //or
// await page.locator("#asbc").waiFor({state: "visible"});

// //How do you verify broken images in Playwright
// const images = await page.locator("img").all();
// for(const img of images){
//     const result = await img.evaluate((image)=>{
//         return image.complete && image.naturalWidth > 0
//     })
//     await expect(result).toBeTruthy();
// }

test.only("Broken images and broken links",async({page,request})=>{
// await page.goto("https://demoqa.com/broken");
// const images = await page.locator('img').all();
// for(const img of images){
//     const result = await img.evaluate((image)=>{
//         return image.complete && image.naturalWidth > 0;
//     })
//     expect(result).toBeTruthy();
// }


const links = await page.locator('a').all();
for(const link of links){
    const url = await link.getAttribute('href');
    if(url && url.startsWith('https')){
        const response = await request.get('url');
        console.log(url,url.status())

        
        expect(response.status()).toBeLessThan(400);
    }
}
});

// });