import React from 'react'
import ReactDOM from 'react-dom'

export default class Sentence extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: false,
      valid: false,
      input: ""
    }
  }

  componentWillReceiveProps(props) {
    const element = ReactDOM.findDOMNode(this)
    const audio = element.querySelector('audio')
    const source = audio.querySelector('source')

    const fileNumber = ("000"+props.sentence.number).slice(-3)
    source.src = "./assets/sounds/s" + fileNumber + ".m4a"
    audio.load()

    this.setState({
      checked: false,
      valid: false,
      input: ""
    })
  }

  _handleChange(e) {
    this.setState({input: e.target.value})
  }

  _handleCheck() {
    var valid = this.props.sentence.en == this.state.input
    this.setState({ checked: true, valid: valid })
	}

  _handleClear() {
    this.setState({ checked: false, valid: false, input: "" })
  }

  render() {
    const fileNumber = ("000"+this.props.sentence.number).slice(-3)
    return (
      <div>
        <div className="jp">
          <div>{this.props.sentence.number}</div>
          <p>{this.props.sentence.jp}</p>
        </div>
        <audio controls preload="auto">
          <source src={`./assets/sounds/s${fileNumber}.m4a`} type="audio/mp4" />
        </audio>
        <p className={`en ${this.state.valid ? 'valid' : 'invalid' }`}>{this.state.checked ? this.props.sentence.en : ""}</p>
        <textarea value={this.state.input} onChange={(e) => this._handleChange(e)} />
        <div>
          <button onClick={() => this._handleCheck()}>Check</button>
          <button onClick={() => this._handleClear()}>Clear</button>
        </div>
      </div>
    )}
}
