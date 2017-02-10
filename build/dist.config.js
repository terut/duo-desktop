import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'app/app.js',
  dest: 'renderer.min.js',
  format: 'umd',
  moduleName: 'Duo',
  plugins: [
    babel(),
    uglify()
  ],
  sourceMap: true
}
