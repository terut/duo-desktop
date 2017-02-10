import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

export default {
  entry: 'app/app.js',
  dest: 'renderer.js',
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
    })
  ]
}
