export default {
  librarySass: {
    src: './elegant-sass-things.scss',
    dest: './docs/css',
    watch: [
      './elegant-sass-things.scss',
      './elegant-sass-things/**/*.scss'
    ]
  },
  demoSass: {
    src: './demo/demo.scss',
    dest: './docs/css',
    watch: './demo/demo.scss'
  },
  autoprefixer: {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
  },
  server: {
    liveReload: true,
    port: 8888,
    root: './docs',
    src: './docs/**/*',
    watch: './docs/**/*'
  }
};
