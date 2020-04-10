'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
const LineByLineReader = require('line-by-line');

const consts = require('./lib/consts');
const sleep = require('./lib/util').sleep;

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  const writeStream = fs.createWriteStream(consts.RESULT_FILE_DESTINATION, {flags: 'a'});
  setupCsv(writeStream);

  let scrapeCount = 1;
  const reader = new LineByLineReader(consts.LINK_FILE_DESTINATION);
  reader
      .on('line', async (targetLink) => {
        try {
          reader.pause();

          console.log(`Scrape Count: ${scrapeCount}`);
          scrapeCount++;

          const resultArray = await scrapePage(page, targetLink);
          writeResultToCSV(resultArray, writeStream);

          reader.resume();
        } catch (e) {
          reader.resume();
        }
      })
      .on('end', async () => {
        await browser.close();
      });
})();

const scrapePage = async (page, targetLink) => {
  try {
    await sleep(1000);
    await page.goto(targetLink, consts.WAIT_OPTION);

    const evalResultH3 = await page.$$eval('h3', (elements, consts) => {
      const evalResult = [];

      consts.SCRAPING_TARGETS
          .filter((target) => target.tag === 'h3' && target.type === 'text')
          .forEach((target) => {
            const matchedNodes = elements.filter((node) => {
              return target.label === node.textContent;
            });

            const matchedValue = matchedNodes[0].parentNode.parentNode.querySelector('td:last-child')
                .querySelector('div').textContent.trim();

            evalResult.push({
              value: matchedValue,
              order: target.order,
            });
          });

      return evalResult;
    }, consts);

    const evalResultH4 = await page.$$eval('h4', (elements, consts) => {
      const evalResult = [];

      consts.SCRAPING_TARGETS
          .filter((target) => target.tag === 'h4' && target.type === 'text')
          .forEach((target) => {
            const matchedNodes = elements.filter((node) => {
              return target.label === node.textContent;
            });

            const matchedValue = matchedNodes[0].parentNode.parentNode.querySelector('td:last-child')
                .querySelector('div').textContent.trim();

            evalResult.push({
              value: matchedValue,
              order: target.order,
            });
          });

      consts.SCRAPING_TARGETS
          .filter((target) => target.tag === 'h4' && target.type === 'anchor')
          .forEach((target) => {
            const matchedNodes = elements.filter((node) => {
              return target.label === node.textContent;
            });

            const anchorNode = matchedNodes[0].parentNode.parentNode.querySelector('td:last-child')
                .querySelector('div').querySelector('a');

            const matchedValue = anchorNode ? anchorNode.href : null;

            evalResult.push({
              value: matchedValue,
              order: target.order,
            });
          });

      return evalResult;
    }, consts);

    return evalResultH3.concat(evalResultH4)
        .sort((a, b) => {
          if (a.order < b.order) return -1;
          if (a.order > b.order) return 1;
          return 0;
        }).map((e) => e.value);
  } catch (e) {
    console.log(`Scrape Error @ ${targetLink}`);
    throw e;
  }
};

const setupCsv = (writeStream) => {
  const sortedLabels = consts.SCRAPING_TARGETS.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  }).map((e) => e.label);
  let theLabel = '';
  sortedLabels.forEach((e, idx, self) => {
    if (idx === 0) {
      theLabel = `"${e}"`;
      return;
    }
    theLabel = `${theLabel}\t"${e}"`;
  });
  writeStream.write(`${theLabel}\n`);
};

const writeResultToCSV = (resultArray, writeStream) => {
  try {
    if (!resultArray) {
      return;
    }

    resultArray.forEach((e, idx, self) => {
      writeStream.write(`"${e}"\t`);
      if ((idx + 1) === self.length) {
        writeStream.write('\n');
      }
    });
  } catch (e) {
    console.log(`WriteCsv Error`);
    throw e;
  }
};
