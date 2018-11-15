const path = require('path');

module.exports = {
    WAIT_OPTION: { waitUntil: 'networkidle2' },
    URL_ORGANIZATION_LIST_PAGE: 'https://fields.canpan.info/organization/',
    LINK_FILE_DESTINATION: path.resolve(process.argv[1], '../../output/links.txt'),
    RESULT_FILE_DESTINATION: path.resolve(process.argv[1], '../../output/result.csv'),
    SCRAPING_TARGETS: [
        {
            label: '法人の種類',
            tag: 'h3',
            type: 'text',
            order: 1
        },
        {
            label: '団体名（法人名称）',
            tag: 'h3',
            type: 'text',
            order: 2
        },
        {
            label: '代表者役職',
            tag: 'h3',
            type: 'text',
            order: 3
        },
        {
            label: '代表者氏名',
            tag: 'h3',
            type: 'text',
            order: 4
        },
        {
            label: '郵便番号',
            tag: 'h4',
            type: 'text',
            order: 5
        },
        {
            label: '都道府県',
            tag: 'h4',
            type: 'text',
            order: 6
        },
        {
            label: '市区町村',
            tag: 'h4',
            type: 'text',
            order: 7
        },
        {
            label: '詳細住所',
            tag: 'h4',
            type: 'text',
            order: 8
        },
        {
            label: '団体ホームページ',
            tag: 'h4',
            type: 'anchor',
            order: 9
        },
        {
            label: '団体ブログ',
            tag: 'h4',
            type: 'anchor',
            order: 10
        },
        {
            label: 'Facebook',
            tag: 'h4',
            type: 'anchor',
            order: 11
        },
        {
            label: 'Twitter',
            tag: 'h4',
            type: 'anchor',
            order: 12
        },
        {
            label: '代表者ホームページ（ブログ）',
            tag: 'h4',
            type: 'anchor',
            order: 13
        },
        {
            label: '寄付',
            tag: 'h4',
            type: 'anchor',
            order: 14
        },
        {
            label: 'ボランティア',
            tag: 'h4',
            type: 'anchor',
            order: 15
        },
        {
            label: '関連ページ',
            tag: 'h4',
            type: 'anchor',
            order: 16
        },
        {
            label: '閲覧書類',
            tag: 'h4',
            type: 'anchor',
            order: 17
        },
        {
            label: 'お問い合わせ用メールアドレス',
            tag: 'h3',
            type: 'text',
            order: 18
        },
        {
            label: '電話番号',
            tag: 'h4',
            type: 'text',
            order: 19
        },
        {
            label: '連絡先区分',
            tag: 'h4',
            type: 'text',
            order: 20
        },
        {
            label: '連絡可能時間',
            tag: 'h4',
            type: 'text',
            order: 21
        },
        {
            label: '連絡可能曜日',
            tag: 'h4',
            type: 'text',
            order: 22
        },
        {
            label: '備考',
            tag: 'h4',
            type: 'text',
            order: 23
        },
        {
            label: '助成金・補助金・物品等、他の組織から受けた支援の実績',
            tag: 'h3',
            type: 'text',
            order: 24
        },
        {
            label: '他のNPO・市民活動団体との協働、他の学協会との共同研究・協働の実績',
            tag: 'h3',
            type: 'text',
            order: 25
        },
        {
            label: '企業・団体との協働・共同研究の実績',
            tag: 'h3',
            type: 'text',
            order: 26
        },
        {
            label: '行政との協働（委託事業など）の実績',
            tag: 'h3',
            type: 'text',
            order: 27
        }
    ]
}
