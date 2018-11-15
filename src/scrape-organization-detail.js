'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');

const consts = require('./lib/consts');
const sleep = require('./lib/util').sleep;

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const writeStream = fs.createWriteStream(consts.RESULT_FILE_DESTINATION, { flags: 'a' });

    const readStream = fs.createReadStream(consts.LINK_FILE_DESTINATION, { encoding: 'utf8' });
    const reader = readline.createInterface({ input: readStream });
    reader
        .on('line', async targetLink => {
            const resultArray = await scrapePage(page, targetLink);
            // writeResultToCSV(resultArray, writeStream);
        })
        .on('close', () => {
            // await browser.close();
        })
})();

const scrapePage = async (page, targetLink) => {
    sleep(10000);
    await page.goto(targetLink, consts.WAIT_OPTION);
    console.log('here');

    let resultArray = [];
    await page.$$eval('#basic h3', (elements, consts, resultArray) => {
        consts.SCRAPING_TARGETS
            .filter(target => target.tag === 'h3' && target.type === 'text')
            .forEach(target => {
                const matchedNodes = elements.filter(node => {
                    return target.label === node.textContent
                });

                console.log(target.label);
                console.log(matchedNodes);
                const matchedValue = matchedNodes[0].parentNode.parentNode.querySelector('td:last-child')
                    .querySelector('div').textContent.trim()

                resultArray.push({
                    value: matchedValue,
                    order: target.order
                });
            });
    }, consts, resultArray);
    // console.log(resultArray);

    await page.$$eval('#basic h4', elements => {

        consts.SCRAPING_TARGETS
            .filter(target => target.tag === 'h4' && target.type === 'text')
            .forEach(target => {
                const matchedNodes = elements.filter(node => {
                    return target.label === node.textContent
                });

                const matchedValue = matchedNodes[0].parentNode.parentNode.querySelector('td:last-child')
                    .querySelector('div').textContent.trim()

                resultArray.push({
                    value: matchedValue,
                    order: target.order
                });
            });

        consts.SCRAPING_TARGETS
            .filter(target => target.tag === 'h4' && target.type === 'anchor')
            .forEach(target => {
                const matchedNodes = elements.filter(node => {
                    return target.label === node.textContent
                });

                const anchorNode = matchedNodes[0].parentNode.parentNode.querySelector('td:last-child')
                    .querySelector('div').querySelector('a');

                const matchedValue = anchorNode ? anchorNode.href : '■■■'; // todo

                resultArray.push({
                    value: matchedValue,
                    order: target.order
                });
            });
    });

    return resultArray.sort((a, b) => {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
    }).map(e => e.label);
}

const writeResultToCSV = (resultArray, writeStream) => {
    if (!resultArray) {
        throw new Error();
    }

    resultArray.forEach(e => {
        writeStream.write(e + '\n');
    });
}