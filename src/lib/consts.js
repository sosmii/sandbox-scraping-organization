const path = require('path');

module.exports = {
    WAIT_OPTION: { waitUntil: 'networkidle2' },
    URL_ORGANIZATION_LIST_PAGE: 'https://fields.canpan.info/organization/',
    LINK_FILE_DESTINATION: path.resolve('../output/links.txt'),
    RESULT_FILE_DESTINATION: path.resolve('../output/result.csv'),
    SCRAPING_TARGETS: [
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
    ]
}
