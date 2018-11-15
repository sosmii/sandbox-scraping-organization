'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');

const consts = require('./lib/consts');
const sleep = require('./lib/util').sleep;

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const writeStream = fs.createWriteStream(consts.RESULT_FILE_DESTINATION, { flags: 'a' });

    const readStream = fs.createReadStream(consts.LINK_FILE_DESTINATION, { encoding: 'utf8' });
    const reader = readline.createInterface({ input: readStream });
    reader
        .on('line', async targetLink => {
            const result = scrapePage(page, targetLink);
            writeResultToFile(result, writeStream);
        })
        .on('close', () => {
            await browser.close();
        })
})();

const scrapePage = async (page, targetLink) => {
    sleep(10000);
    await page.goto(targetLink, WAIT_OPTION);

    const result = await page.$$eval('#basic h3', elements => {
        const hojinNodes = elements.filter(e => {
            return e.textContent === '法人の種類'
        });

        return hojinNodes[0].parentNode.parentNode.querySelector('td:last-child')
            .querySelector('div').textContent.trim();
    });

    console.log(result);
}

const writeResultToFile = async (result, writeStream) => {
    stream.write(links + '\n');
}