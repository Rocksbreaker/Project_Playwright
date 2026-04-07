import {test} from "@playwright/test"

export class Login{
    constructor(page){
        this.page = page;
        this.username= page.locator("#user-name");
        this.password=page.getByPlaceholder("Password");
        this.loginBtn = page.getByRole("button",{name:'Login',exact:true});
    }

    async login(username,password){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }


}