const contexts = import.meta.glob('./child/*.js');

let lang = {};

Object.keys(contexts).forEach((component) => {
  const componentName = component.replace('./child/', '').replace('.js', '');
  contexts[component]().then((module) => {
    const componentEntity = module.default;
    lang[componentName] = componentEntity;
  });
});

if (window['i18n' + 'en']) {
  lang = deepObjectMerge(lang, window['i18n' + 'en']);
}

export default lang;