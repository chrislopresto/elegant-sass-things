module.exports = {
  librarySass: {
    src: './elegant-sass-things.scss',
    dest: './docs/css',
    watch: [
      './elegant-sass-things.scss',
      './elegant-sass-things/**/*.scss'
    ]
  },
  demoSass: {
    src: './demo/scss/demo.scss',
    dest: './docs/css',
    watch: './demo/scss/demo.scss'
  },
  autoprefixer: {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
  },
  server: {
    liveReload: {
      hostname: 'localhost',
      port: 38888
    },
    port: 8888,
    root: './docs',
    src: './docs/**/*',
    watch: './docs/**/*'
  },
  jsServer: {
    hostname: 'localhost',
    port: 8889,
    script: './dist/dev.js',
    src: './demo/js/**/*.js',
    dest: './docs/js/',
    watch: [
      './demo/js/**/*.js',
      './dev/**/*.js',
      './webpack.config.js'
    ],
    transpile: {
      src: './dev/**/*.js',
      dest: './dist/'
    }
  }
};
