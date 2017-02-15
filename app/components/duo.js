import React from 'react'
import Immutable from 'immutable'
import Sentence from './sentence'
import jsondata from '../../assets/sentences.json'

export default class Duo extends React.Component {
  constructor() {
    super()
    this.sections = jsondata
    this.state = {
      markedSentences: Immutable.Map(),
      selectedSection: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.selectedSection != prevState.selectedSection) {
      window.scrollTo(0,0)
    }
  }

  _handleClick(i) {
    this.setState({
      selectedSection: i
    })
  }

  _handleMarked(sentence) {
    const section = this.sections[this.state.selectedSection].section
    var sentences = this.state.markedSentences.get(section) || Immutable.Set([])

    var newSentences = null
    if(sentences.has(sentence.number)) {
      newSentences = sentences.delete(sentence.number)
    } else {
      newSentences = sentences.add(sentence.number)
    }

    this.setState({
      markedSentences: this.state.markedSentences.set(section, newSentences)
    })
  }

  _isMarked(sentence) {
    const section = this.sections[this.state.selectedSection].section
    const sentences = this.state.markedSentences.get(section)
    if(sentences && sentences.has(sentence.number)) {
      return true
    } else {
      return false
    }
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
          <Sentence sentence={s} marked={this._isMarked(s)} onMarked={this._handleMarked.bind(this)}/>
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
