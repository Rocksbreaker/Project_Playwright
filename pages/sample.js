import {test} from "@playwright/test";

export class Sample{
    constructor(page){
        this.page = page;
        this.addBtn = page.getByRole("button",{name:"Add"})
        this.firstname = page.getByPlaceholder("First Name")
    }

    
    async btnClick(){
        await this.addBtn.click();
    }

    async firstnameFill(fname){
        await this.firstname.fill(fname);
    }
}