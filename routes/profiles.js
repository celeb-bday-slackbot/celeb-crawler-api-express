const express = require('express');
const getYMDString = require('../modules/getYMDString');
const memoize = require('../modules/memoize');

const crawlPage = require('../middleware/crawlPage');

const router = express.Router();

const crawlPageWithCache = memoize(async ({ q, datetime }) => await crawlPage({ q }));

router.get('/', async (req, res, next) => {
  try {
    const result = await crawlPageWithCache({
      q: '오늘 생일인 연예인',
      datetime: getYMDString(new Date)
    });
    res.send({
      status: 200,
      result
    });

  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;