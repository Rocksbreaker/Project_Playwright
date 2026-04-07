
export class HomePage{
    constructor(page){
        this.page = page;
        this.cartBtn1 = page.getByRole("button","Add to cart").first();
    }

    async addCart(){
        this.cartBtn1.click();
    }
}