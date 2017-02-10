import React from 'react'

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
    return (
      <div>
        <div className="jp">
          <div>{this.props.sentence.number}</div>
          <p>{this.props.sentence.jp}</p>
        </div>
        <p className={`en ${this.state.valid ? 'valid' : 'invalid' }`}>{this.state.checked ? this.props.sentence.en : ""}</p>
        <div>
          <textarea value={this.state.input} onChange={(e) => this._handleChange(e)} />
          <button onClick={() => this._handleCheck()}>Check</button>
          <button onClick={() => this._handleClear()}>Cler</button>
        </div>
      </div>
    )
  }
}
