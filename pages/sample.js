import {test} from "@playwright/test";

export class Sample{
    constructor(page){
        this.page = page;
        this.addBtn = page.getByRole("button",{name:"Add"})
        this.username = page.getByPlaceholder("Username")
    }

    
    async btnClick(){
        await this.addBtn.click();
    }

    async userNameFill(uname){
        await this.username.fill(uname);
    }
}