'use strict';

const puppeteer = require('puppeteer');
const readline = require('readline');

const WAIT_OPTION = { waitUntil: 'networkidle2' }
const URL_ORGANIZATION_LIST_PAGE = 'https://fields.canpan.info/organization/';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(URL_ORGANIZATION_LIST_PAGE, WAIT_OPTION);

    // TODO
    // deleteExistingLinks();
    let stream = fs.createWriteStream('links.txt', { flags: 'a' });
    while (true) {
        const nextLink = await retrieveNextLink(page);
        if (!nextLink) {
            break;
        }

        const links = await getAllLinksFromH3(page);
        await writeLinksToFile(links, stream);

        await sleep(1000);
        await page.goto(nextLink, WAIT_OPTION);
    }

    const writeStream = fs.createWriteStream('result.csv', { flags: 'a' });

    const readStream = fs.createReadStream('links.txt', { encoding: 'utf8' });
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

async function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// logger.js
// log4js使う？
const LOG_DIR = `${__dirname}/../log`;
const TRACING_FILE_NAME = 'trace.json';

// scraper.js
const retrieveNextLink = async page => {
    const nextLink = await page.$eval('.paging > li:last-child > a', element => {
        return element.href;
    });

    return nextLink;
}

const getAllLinksFromH3 = async page => {
    const organizationLinks = await page.$$eval('h3 > a', array => {
        return array.map(e => e.href)
    });

    return organizationLinks;
}

const scrapePage = async (page, targetLink) => {
    await page.goto(targetLink, WAIT_OPTION);

    const hojin = '法人の種類';
    const bbb = page.$$eval('#basic h3', elements => {
        const hojinNode = elements.filter(e => {
            hojin === e.textContent
        });

        return hojinNode.parentNode.lastChild;
    });

    console.log(bbb);
}

// result-handler.js
const fs = require('fs');

const writeLinksToFile = (links, stream) => {
    if (!links) {
        throw new Error();
    }

    stream.write(links + '\n');
}

const writeResultToFile = async (result, writeStream) => {
    stream.write(links + '\n');
}