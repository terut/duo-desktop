import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'app/app.js',
  dest: 'renderer.min.js',
  format: 'umd',
  moduleName: 'Duo',
  plugins:[
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ],
  sourceMap: true
}
