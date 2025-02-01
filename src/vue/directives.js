import Vue from 'vue';

const path = require('path');
const files = require.context('common/directives', false, /.js$/);

const modules = {};
files.keys().forEach((key) => {
  const name = path.basename(key, '.js');
  // console.log('name',name);
  let content = files(key).default || files(key);
  // console.log('content',content);

  Vue.use(content);
});
