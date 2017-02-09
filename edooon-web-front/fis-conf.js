fis.require('jello')(fis);
//fis.config.set('livereload.port', 98081);

// 标记 staitc/libs 下面的 js 为模块化代码。
fis.match('/static/libs/**.{js,es6}', {
  isMod: true,
  notStrict: true
});

fis.match('/widget/**.{js,es6}', {
  isMod: true,
  notStrict: true
});

// jello 里面默认用的 commonjs 这里改成 amd 方案。
fis.unhook('commonjs');
fis.hook('amd', {
  packages: [

    // 用来存放 libs 库
    {
      name: 'libs',
      location: 'static/libs/',
      main: 'index'
    },
    {
      name: 'funs',
      location: 'static/libs/funs/',
      main: 'index'
    }
  ]
});

// 设置 *.scss 配置配置项
fis.match('*.scss', {
  rExt: '.css',
  parser: fis.plugin('sass', {
    include_paths: [
      './static/scss',
      './components/compass-mixins',
      './node_modules/bootstrap-sass/assets/stylesheets'
    ],
    sourceMap: true
  })
});

fis.match('*.es6', {
  rExt: '.js',
  parser: fis.plugin('babel2'),
  isJsLike: true,
  notStrict: true
});

// 不启用 less
fis.match('*.less', {
  parser: null
});

// 解析 markdown，编译成 html
fis.match('*.md', {
  parser: fis.plugin('marked'),
  rExt: '.html'
});

fis.media('prod')
  .match('::package', {
    // 关于打包配置，请参考：https://github.com/fex-team/fis3-packager-deps-pack
    packager: fis.plugin('deps-pack', {
      'pkg/frame.css': [
        '/static/scss/**.css',
        '/static/scss/**.scss',
        '/widget/**.scss'
      ],
      'pkg/boot.js': [
        'static/js/require.js',
        'components/jquery/jquery.js',
        'components/bootstrap/bootstrap.js',
        'components/bootstrap/bootstrap.js:deps' // 匹配依赖部分
      ],
      'pkg/app.js': [
        'page/examples/form.js',
        'page/examples/form.js:deps'
      ]
    })
  });

fis.match('*.{vm,jsp,html,js,es6}', {
  useSameNameRequire: true
});

fis.match('*.{js,es6,scss,css}', {
  useHash: false
});

fis.match('components/icheck/skins/minimal/_all.css', {
  //release: true
});

fis.match('/widget/**.{vm,jsp,tmpl}', {
  preprocessor: [
    fis.plugin('extlang', "prepend"),
    fis.plugin('cssspace', "prepend")
  ]
});
fis.match('/page/**.vm', {
  preprocessor: fis.plugin('cssspace' , "prepend")
});
fis.match('/widget/**.{scss,js,es6}', {
  preprocessor: [
    fis.plugin('cssspace', "prepend")
  ]
});
fis.match('*.{vm,tmpl,es6,js}', {
  parser: fis.plugin('replace', {wordbook: "wordbook.json"}, "prepend")
});


fis.media('qa').match('*', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://115.182.220.22:8999/receiver',
    to: '/usr/local/tomcat-web/webapps/ROOT'
  })
});
fis.media('lss').match('*', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://192.168.1.45:8999/receiver',
    //to: 'D:/Apache Tomcat 8.0.15/webapps/ROOT'
    to: 'F:/web-www/src/main/webapp'
  })
});
fis.media('qa').match('*.{js,es6,scss,css}', {
  useHash: true
}).match("server.conf", {
  release: false
}).match('/WEB-INF/**', {
  release: false
});
fis.media('lss').match('*.{js,es6,scss,css}', {
  useHash: true
}).match("server.conf", {
  release: false
}).match('/WEB-INF/**', {
  release: false
});
