#### plugin/qiankun 有个bug， PR中

是为了解决通配的路由下切换子应用的问题，还在PR中，

暂时的解决方案是在 `src/.umi/plugin-qiankun/MicroApp.tsx` 的第一个Effect加上依赖 `name`.