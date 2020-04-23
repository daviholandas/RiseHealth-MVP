const puppeteer = require('puppeteer');
const hbs = require('handlebars');
const path = require('path');
const fs = require('fs-extra');


class CreateASO{
    async createTemplateASO(data){
        try{
            const template = path.join(process.cwd(), 'templates', 'aso.hbs');
            const html = await fs.readFile(template,'utf-8');
            return hbs.compile(html)(data);
        }catch(err){
            console.log(err)
        }
    }

    async createPdf(data){
        try{
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(await this.createTemplateASO(data));
            await page.emulateMedia('print');
            await page.pdf({
                path:`data/aso9.pdf`,
                format:'A4',
                printBackground:true
            })
            console.log('done!');
            await browser.close()
            process.exit();
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new CreateASO;