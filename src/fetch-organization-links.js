'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');

const consts = require('./lib/consts');
const sleep = require('./lib/util').sleep;

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(consts.URL_ORGANIZATION_LIST_PAGE, consts.WAIT_OPTION);

  // deleteExistingLinks();

  const stream = fs.createWriteStream(consts.LINK_FILE_DESTINATION, {flags: 'a'});
  while (true) {
    const nextLink = await retrieveNextLink(page);
    if (!nextLink) {
      break;
    }

    const organizationLinks = await getAllOrganizationLinks(page);
    await writeLinksToFile(organizationLinks, stream);

    await sleep(10000);
    await page.goto(nextLink, consts.WAIT_OPTION);
  }

  await browser.close();
})();

const retrieveNextLink = async (page) => {
  return await page.$eval('.paging > li:last-child > a', (element) => {
    return element.href;
  });
};

const getAllOrganizationLinks = async (page) => {
  return await page.$$eval('h3 > a', (array) => {
    return array.map((e) => e.href);
  });
};

const writeLinksToFile = (links, stream) => {
  if (!links) {
    throw new Error();
  }

  for (const e of links) {
    stream.write(e + '\n');
  }
};
