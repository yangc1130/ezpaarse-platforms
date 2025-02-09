#!/usr/bin/env node

'use strict';
const Parser = require('../.lib/parser.js');

/**
 * Recognizes the accesses to the platform Oxford Music Online
 * @param  {Object} parsedUrl an object representing the URL to analyze
 *                            main attributes: pathname, query, hostname
 * @param  {Object} ec        an object representing the EC whose URL is being analyzed
 * @return {Object} the result
 */
module.exports = new Parser(function analyseEC(parsedUrl, ec) {
  let result = {};
  let path   = parsedUrl.pathname;
  // uncomment this line if you need parameters
  let param = parsedUrl.query || {};

  // use console.error for debuging
  // console.error(parsedUrl);

  let match;

  if ((match = /^\/grovemusic\/view\/10.[0-9]+\/[a-z]+\/([0-9]+).[0-9]+.[0-9]+\/([a-z0-9-]+)$/i.exec(path)) !== null) {
    // /grovemusic/view/10.1093/gmo/9781561592630.001.0001/omo-9781561592630-e-0000028694?rskey=teZtuS
    // /grovemusic/view/10.1093/gmo/9781561592630.001.0001/omo-9781561592630-e-0000028694?print=pdf
    result.rtype = 'ARTICLE';
    result.mime = (param.print === 'pdf') ? 'PDF': 'HTML';
    result.online_identifier = match[1];
    result.unitid = match[2];
  }

  return result;
});
