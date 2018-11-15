'use strict';

const puppeteer = require('puppeteer');
const readline = require('readline');

const WAIT_OPTION = { waitUntil: 'networkidle2' }
const URL_ORGANIZATION_LIST_PAGE = 'https://fields.canpan.info/organization/detail/1384221311';

const SCRAPING_TARGETS = [
    {
        label: '法人の種類',
        tag: 'h3',
        type: 'text'
    },
    {
        label: '団体名（法人名称）',
        tag: 'h3',
        type: 'text'
    },
    {
        label: '代表者役職',
        tag: 'h3',
        type: 'text'
    },
    {
        label: '代表者氏名',
        tag: 'h3',
        type: 'text'
    },
    {
        label: '郵便番号',
        tag: 'h4',
        type: 'text'
    },
    {
        label: '都道府県',
        tag: 'h4',
        type: 'text'
    },
    {
        label: '市区町村',
        tag: 'h4',
        type: 'text'
    },
    {
        label: '詳細住所',
        tag: 'h4',
        type: 'text'
    },
    {
        label: '団体ホームページ',
        tag: 'h4',
        type: 'anchor'
    },
    {
        label: '団体ブログ',
        tag: 'h4',
        type: 'anchor'
    },
    {
        label: 'Facebook',
        tag: 'h4',
        type: 'anchor'
    },
    {
        label: 'Twitter',
        tag: 'h4',
        type: 'anchor'
    },
    {
        label: '代表者ホームページ（ブログ）',
        tag: 'h4',
        type: 'anchor'
    },
    {
        label: '寄付',
        tag: 'h4',
        type: 'anchor'
    },
    {
        label: 'ボランティア',
        tag: 'h4',
        type: 'anchor'
    },
    {
        label: '関連ページ',
        tag: 'h4',
        type: 'anchor'
    },
    {
        label: '閲覧書類',
        tag: 'h4',
        type: 'anchor'
    },
    {
        label: 'お問い合わせ用メールアドレス',
        tag: 'h3',
        type: 'text'
    },
    {
        label: '電話番号',
        tag: 'h4',
        type: 'text'
    },
    {
        label: '連絡先区分',
        tag: 'h4',
        type: 'text'
    },
    {
        label: '連絡可能時間',
        tag: 'h4',
        type: 'text'
    },
    {
        label: '連絡可能曜日',
        tag: 'h4',
        type: 'text'
    },
    {
        label: '備考',
        tag: 'h4',
        type: 'text'
    },
    {
        label: '助成金・補助金・物品等、他の組織から受けた支援の実績',
        tag: 'h3',
        type: 'text'
    },
    {
        label: '他のNPO・市民活動団体との協働、他の学協会との共同研究・協働の実績',
        tag: 'h3',
        type: 'text'
    },
    {
        label: '企業・団体との協働・共同研究の実績',
        tag: 'h3',
        type: 'text'
    },
    {
        label: '行政との協働（委託事業など）の実績',
        tag: 'h3',
        type: 'text'
    }
];

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await scrapePage(page, URL_ORGANIZATION_LIST_PAGE);
    await browser.close();
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

const getAllLinksFromTag = async page => {
    const organizationLinks = await page.$$eval('h3 > a', array => {
        return array.map(e => e.href)
    });

    return organizationLinks;
}

const scrapePage = async (page, targetLink) => {
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