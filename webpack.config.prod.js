const SitemapPlugin = require('sitemap-webpack-plugin').default;
const prettydata = require('pretty-data');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const paths = [
  '/'
]
const prettyPrint = xml => {
  const result = prettydata.pd.xml(xml);
  return result;
};
const config = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new SitemapPlugin('https://coffeeabacus.com/', paths, {
      changeFreq: 'monthly',
      skipGzip: true,
      formatter: prettyPrint,
    }),
  ],
});