import React from 'react'
import Sentence from './sentence'
import jsondata from '../../assets/sentences.json'

export default class Duo extends React.Component {
  constructor() {
    super()
    this.sections = jsondata
    this.state = {
      selectedSection: 0
    }
  }

  _handleClick(i) {
    this.setState({
      selectedSection: i
    })
  }

  _sectionView() {
    const list = this.sections.map((s, i) => {
      const selected = this.state.selectedSection == i
      return <li key={i} onClick={() => this._handleClick(i) }  className={selected ? "selected" : ""}>Section {s.section}</li>
    })
    return <ul className="list">{list}</ul>
  }

  _sentenceView() {
    const list = this.sections[this.state.selectedSection].sentences.map((s, i) => {
      return (
        <li key={i} className="sentence" >
          <Sentence sentence={s} />
        </li>
      )
    })
    return list
  }

  render() {
    return (
      <div id="container">
        <div id="sections">
          {this._sectionView()}
        </div>
        <div id="section">
          <div>
            <h1 className="title">Section {this.state.selectedSection + 1}</h1>
            <ul>{this._sentenceView()}</ul>
          </div>
        </div>
      </div>
    )
  }
}
