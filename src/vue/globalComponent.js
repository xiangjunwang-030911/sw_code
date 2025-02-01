export default {
  install(app) {
    // 导入全局组件目录
    const contexts1 = import.meta.globEager('../components/globalComponents/*.vue');
    const contexts2 = import.meta.globEager('../components/globalComponents/*/index.vue');

    const contexts = { ...contexts1, ...contexts2 }
    // 全局注册组件
    Object.values(contexts).forEach((component) => {
      const componentEntity = component.default;
      if (componentEntity.name) {
        app.component(componentEntity.name, componentEntity);
      }
    });
  }
};