import babel from 'rollup-plugin-babel'

export default {
  entry: 'app/app.js',
  dest: 'renderer.js',
  format: 'umd',
  moduleName: 'Duo',
  plugins:[
    babel()
  ]
}
