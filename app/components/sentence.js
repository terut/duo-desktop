import React from 'react'
import ReactDOM from 'react-dom'
import * as JsDiff from 'diff'

export default class Sentence extends React.Component {
  constructor() {
    super()
    this._clearCache()
    this.state = {
      diff: null,
      input: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.sentence.number != this.props.sentence.number) {
      const element = ReactDOM.findDOMNode(this)
      const audio = element.querySelector('audio')
      const source = audio.querySelector('source')

      const fileNumber = ("000"+nextProps.sentence.number).slice(-3)
      source.src = "./assets/sounds/s" + fileNumber + ".m4a"
      audio.load()

      this._handleClear()
    }
  }

  _handleClear() {
    this._clearCache()
    this.setState({ diff: null, input: "" })
  }

  _clearCache() {
    this.cachedText = null
  }

  _handleChange(e) {
    this.setState({input: e.target.value})
  }

  _handleCheck() {
    const diff = JsDiff.diffWords(this.state.input, this.props.sentence.en)
    this._clearCache()
    this.setState({ diff: diff })
	}

  _showEn() {
    if(!this.state.diff) {
      return ""
    }

    if(this.state.diff.isEmpty) {
      return this.props.sentence.en
    }

    if(this.cachedText) {
      return this.cachedText
    }

    this.cachedText = this.state.diff.map((part, i) => {
      if(part.removed) {
        return
      }
      if(part.added) {
        return <span key={i} className="invalid">{part.value}</span>
      }
      return part.value
    })
    return this.cachedText
  }

  render() {
    const fileNumber = ("000"+this.props.sentence.number).slice(-3)
    return (
      <div>
        <div className="jp">
          <div>{this.props.sentence.number}.</div>
          <p>{this.props.sentence.jp}</p>
        </div>
        <audio controls preload="auto">
          <source src={`./assets/sounds/s${fileNumber}.m4a`} type="audio/mp4" />
        </audio>
        <p className="en valid">{this._showEn()}</p>
        <textarea value={this.state.input} onChange={(e) => this._handleChange(e)} />
        <div className="actions">
          <button onClick={() => this._handleCheck()}>Check</button>
          <button onClick={() => this._handleClear()}>Clear</button>
          <button className={this.props.marked ? "marked" : ""} onClick={() => this.props.onMarked(this.props.sentence)}>Mark</button>
        </div>
      </div>
    )}
}
