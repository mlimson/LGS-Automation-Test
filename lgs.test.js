const puppeteer = require('puppeteer');
let browser;
let page;

const lgs_url= "http://94.237.65.245:7788";

//Product Module
const productID='31';
const productSearch = 'Natures Spring Philippines';
const product = 'Natures Spring';
const productDesc = ' Philippines';
const productDelete = '1000';

//Supplier Module
const companySearch = 'Company5';
const supplier = 'Irish Jade';
const supplierID = '14';
const supplierName = 'Extra Virgin Coconu';

//Customer Module
const customer = 'Jade Agay';
const customerUpdate = ' Supalpal'
const customerID = '10'
const customerName = 'Andres Tenorio';

//Purchase Module
const purchase = '1001';
const purchaseID = '2';
const purchaseUpdate = '520.00';

beforeAll(async () => {
    browser = await puppeteer.launch({
        devtools: false, 
        headless: false, 
        defaultViewport: null,
        args: [
            '--start-maximized',
            '--kiosk-printing',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-sandbox',
            // '--proxy-server=http://192.168.36.35:3128'
        ]
        });
}, 100000);

beforeEach(async () => {
    page = await browser.newPage();
}, 100000);

describe('Tests on Lou Geh Supermarket', () => {
    describe('Product Module', () => {
        it('Search Product', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#product_menu')
            await page.click('#product_menu')

            await page.waitForTimeout(1000);

            await page.waitForSelector('.row > .col-sm-12 > #productList_filter > label > .form-control')
            await page.type('.row > .col-sm-12 > #productList_filter > label > .form-control', productID)

            await page.waitForTimeout(1000);
            const desc = await page.$eval('.col-sm-12 > #productList > tbody > .odd > .align-middle:nth-child(3)', elem => elem.innerText);
            expect(desc).toMatch(productSearch);
        },100000),

        it('Adding Product', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#product_menu')
            await page.click('#product_menu')
            
            await page.waitForSelector('#addProduct')
            await page.click('#addProduct')
            
            await page.waitForSelector('#productModal')
    
            await page.waitForTimeout(1000);
            await page.waitForSelector('#barcode')
            await page.click('#barcode')
            await page.type('#barcode', '10002451')
            
            await page.waitForSelector('#description')
            await page.click('#description')
            await page.type('#description', product)
            
            await page.waitForSelector('#quantity')
            await page.click('#quantity')
            await page.type('#quantity', '1000')
            
            await page.waitForSelector('#cost_per_unit')
            await page.click('#cost_per_unit')
            await page.type('#cost_per_unit', '30',{delay:30})
            
            await page.waitForSelector('#action')
            await page.click('#action')

            page.on('dialog', async dialog => {
                await dialog.accept();
            });

            await page.waitForTimeout(2000);
    
            const desc = await page.$eval('.col-sm-12 > #productList > tbody > .odd:nth-child(1) > .align-middle:nth-child(3)', elem => elem.innerText);
            expect(desc).toMatch(product);
        }, 100000),

        it('Updating Product', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#product_menu')
            await page.click('#product_menu')

            await page.waitForTimeout(1000);

            await page.waitForSelector('.row > .col-sm-12 > #productList_filter > label > .form-control')
            await page.type('.row > .col-sm-12 > #productList_filter > label > .form-control', productDelete)

            await page.waitForSelector('.btn.btn-primary.update')
            await page.click('.btn.btn-primary.update')

            await page.waitForTimeout(1000);

            await page.waitForSelector('#description')
            await page.click('#description')
            await page.type('#description', productDesc)
            await page.waitForTimeout(1000);
            await page.waitForSelector('#action')
            await page.click('#action')
            await page.waitForTimeout(1000);
            const desc = await page.$eval('.col-sm-12 > #productList > tbody > .odd > .align-middle:nth-child(3)', elem => elem.innerText);
            expect(desc).toMatch(product + productDesc);
        },100000)
    }, 500000),

    describe('Supplier Module', () => {
        it('Search Supplier', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#supplier_menu')
            await page.click('#supplier_menu')

            await page.waitForSelector('.row > .col-sm-12 > #supplierList_filter > label > .form-control')
            await page.type('.row > .col-sm-12 > #supplierList_filter > label > .form-control', companySearch)

            page.on('dialog', async dialog => {
                await dialog.accept();
            });

            await page.waitForTimeout(1000);
            const desc = await page.$eval('.col-sm-12 > #supplierList > tbody > .odd:nth-child(1) > .align-middle:nth-child(2)', elem => elem.innerText);
            expect(desc).toMatch(companySearch);
        
        }, 100000),

        it('Adding Supplier', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#supplier_menu')
            await page.click('#supplier_menu')        
            
            await page.waitForSelector('#addSupplier')
            await page.click('#addSupplier')
            
            await page.waitForSelector('#supplierModal')
    
            await page.waitForTimeout(1000);
            await page.waitForSelector('#company_name')
            await page.click('#company_name')
            await page.type('#company_name', supplier)
            
            await page.waitForSelector('#mobile')
            await page.click('#mobile')
            await page.type('#mobile', '094151')
            
            await page.waitForSelector('#address')
            await page.click('#address')
            await page.type('#address', 'Apopong, GSC')
            
            await page.waitForSelector('#action')
            await page.click('#action')
    
            page.on('dialog', async dialog => {
                await dialog.accept();
            });
            await page.waitForTimeout(1000);
            const desc = await page.$eval('.col-sm-12 > #supplierList > tbody > .odd:nth-child(1) > .align-middle:nth-child(2)', elem => elem.innerText);
            expect(desc).toMatch(supplier);
        
        }, 100000),

        it('Updating Supplier', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#supplier_menu')
            await page.click('#supplier_menu')

            await page.waitForSelector('.btn.btn-primary.update')
            await page.click('.btn.btn-primary.update')
            
            await page.waitForSelector('#supplierModal')
    
            await page.waitForTimeout(1000);
            await page.waitForSelector('#company_name')
            await page.click('#company_name')
            await page.type('#company_name', supplierName)

            
            await page.waitForSelector('#action')
            await page.click('#action')
    
            page.on('dialog', async dialog => {
                await dialog.accept();
            });

            await page.waitForTimeout(1000);
            const desc = await page.$eval('.col-sm-12 > #supplierList > tbody > .odd:nth-child(1) > .align-middle:nth-child(2)', elem => elem.innerText);
            expect(desc).toMatch(supplierName);
        
        }, 100000)
    },500000),

    describe('Customer Module', () => {
        it('Search Customer', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#customer_menu')
            await page.click('#customer_menu')   

            await page.waitForSelector('.row > .col-sm-12 > #customerList_filter > label > .form-control')
            await page.type('.row > .col-sm-12 > #customerList_filter > label > .form-control', customerID)
            
            const desc = await page.$eval('.col-sm-12 > #customerList > tbody > .odd:nth-child(1) > .align-middle:nth-child(2)', elem => elem.innerText);
            expect(desc).toMatch(customerName);
        
        }, 100000),

        it('Adding Customer', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#customer_menu')
            await page.click('#customer_menu')   
            
            await page.waitForSelector('#addCustomer')
            await page.click('#addCustomer')
            
            await page.waitForSelector('#customerModal')
    
            await page.waitForTimeout(1000);
            await page.waitForSelector('#name')
            await page.click('#name')        
            await page.type('#name', customer)
            
            await page.waitForSelector('#mobile')
            await page.click('#mobile')
            await page.type('#mobile', '324354')
            
            await page.waitForSelector('#address')
            await page.click('#address')
            await page.type('#address', 'New Bohol, GSC')
            
            await page.waitForSelector('#action')
            await page.click('#action')
    
            page.on('dialog', async dialog => {
                await dialog.accept();
            });
            await page.waitForTimeout(1000);
            const desc = await page.$eval('.col-sm-12 > #customerList > tbody > .odd:nth-child(1) > .align-middle:nth-child(2)', elem => elem.innerText);
            expect(desc).toMatch(customer);
        
        }, 100000),

        it('Updating Customer', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#customer_menu')
            await page.click('#customer_menu')   

            await page.waitForSelector('.btn.btn-primary.update')
            await page.click('.btn.btn-primary.update')
            
            await page.waitForTimeout(1000);
            await page.waitForSelector('#name')
            await page.click('#name')        
            await page.type('#name', customerUpdate)
            
            await page.waitForSelector('#action')
            await page.click('#action')
    
            page.on('dialog', async dialog => {
                await dialog.accept();
            });
            await page.waitForTimeout(1000);
            const desc = await page.$eval('.col-sm-12 > #customerList > tbody > .odd:nth-child(1) > .align-middle:nth-child(2)', elem => elem.innerText);
            expect(desc).toMatch(customerUpdate);
        
        }, 100000)
    }, 500000),

    describe('Purchase Module', () => {
        it('Search Purchase', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#purchase_menu')
            await page.click('#purchase_menu')

            await page.waitForSelector('.row > .col-sm-12 > #purchaseList_filter > label > .form-control')
            await page.type('.row > .col-sm-12 > #purchaseList_filter > label > .form-control', purchaseID)
    
            await page.waitForTimeout(1000);
            const desc = await page.$eval('.col-sm-12 > #purchaseList > tbody > .odd:nth-child(1) > .align-middle:nth-child(1)', elem => elem.innerText);
            expect(desc).toMatch(purchaseID);
        
        }, 100000),

        it('Adding Purchase', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#purchase_menu')
            await page.click('#purchase_menu')
            
            await page.waitForSelector('#addPurchase')
            await page.click('#addPurchase')
            
            await page.waitForSelector('#purchaseModal')
    
            await page.waitForTimeout(1000);
            await page.waitForSelector('#pid')
            await page.select('#pid', '1')
            
            await page.waitForSelector('#quantity')
            await page.click('#quantity')
            await page.type('#quantity', '10')
            
            await page.waitForSelector('#unit_price')
            await page.click('#unit_price')        
            await page.type('#unit_price', '500')
            
            await page.waitForSelector('#action')
            await page.click('#action')
    
            page.on('dialog', async dialog => {
                await dialog.accept();
            });
            await page.waitForTimeout(1000);
            const desc = await page.$eval('.col-sm-12 > #purchaseList > tbody > .odd:nth-child(1) > .align-middle:nth-child(2)', elem => elem.innerText);
            expect(desc).toMatch(purchase);
        
        }, 100000),

        it('Update Purchase', async () => {
            await page.goto(lgs_url)
            await page.waitForSelector('#purchase_menu')
            await page.click('#purchase_menu')

            await page.waitForTimeout(1000);
            await page.waitForSelector('.btn.btn-primary.update')
            await page.click('.btn.btn-primary.update')
            await page.waitForTimeout(1000);

            await page.waitForSelector('#unit_price')
            await page.click('#unit_price')        
            await page.type('#unit_price', purchaseUpdate)
            
            await page.waitForSelector('#action')
            await page.click('#action')
    
            page.on('dialog', async dialog => {
                await dialog.accept();
            });
            await page.waitForTimeout(1000);
            const desc = await page.$eval('.col-sm-12 > #purchaseList > tbody > .odd:nth-child(1) > .align-middle:nth-child(4)', elem => elem.innerText);
            expect(desc).toMatch(purchaseUpdate);
        
        }, 100000)
    }, 500000)
}, 500000)