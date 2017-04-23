import path from 'path'
import { Application } from 'spectron'
import assert from 'assert'

var electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
if (process.platform === 'win32') electronPath += '.cmd'
let appPath = path.join(__dirname, '..')

describe('application launch', function() {
  this.timeout(10000)

  beforeEach(function() {
    console.log(electronPath)
    this.app = new Application({
      path: electronPath,
      args: [appPath]
    })
    return this.app.start()
  })

  afterEach(function() {
    if(this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function() {
    return this.app.client.getWindowCount().then(function(count) {
      assert.equal(count, 1)
    })
  })
})
