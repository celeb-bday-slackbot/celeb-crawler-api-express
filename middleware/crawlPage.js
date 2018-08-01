const debug = require('debug')('celeb-crawler-express:crawlPage');
const puppeteer = require('puppeteer');

async function crawlPage({ q }) {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    page.on('console', msg => debug('[CRALLER PAGE LOG] ', msg.text()));

    await page.goto(`https://m.search.naver.com/search.naver?query=${encodeURIComponent(q)}`, { waitUntil: 'domcontentloaded' });

    const profile = await page.evaluate(() => {
      return (($) => {
        const $coll = $('#_ncr_mashup');
        const $list = $coll.find('.list_document .bx').map((i, li) => {
          try {
            const $li = $(li);
            const $docThumb = $li.find('.document_thumb img');
            const $docInfoArea = $li.find('.document_info');
            const $docInfo = $docInfoArea.find('.info');
            return {
              thumbnail: $docThumb.attr('src'),
              name: $docInfoArea.find('.tit').text(),
              job: $docInfo.eq(0).text().split(/, ?/),
              birthdate: $docInfo.eq(1).text().split(/[^0-9]/ig).filter((str) => str !== '').map((str) => str.length > 1 ? str : '0' + str).join('')
            }
          } catch (e) {
            console.log(e);
            return null;
          }
        });


        return $list.get();

      })(jQuery);
    });

    await browser.close();

    return profile;

  } catch (e) {
    debug(e);
    return null;
  }
}

module.exports = crawlPage;
