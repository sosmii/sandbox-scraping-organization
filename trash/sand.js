'use strict';

const puppeteer = require('puppeteer');

const consts = {
    SCRAPING_TARGETS: [{
        label: '法人の種類',
        tag: 'h3',
        type: 'text',
        order: 1
    }]
};

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://fields.canpan.info/organization/detail/1384221311', { waitUntil: 'networkidle2' });

    let resultArray;
    await page.$$eval('#basic h3', elements => {

        consts.SCRAPING_TARGETS
            .filter(target => target.tag === 'h3' && target.type === 'text')
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
    }, SCRAPING_TARGETS);
})();