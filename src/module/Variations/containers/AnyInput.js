import React, { Component } from "react";
import { FormGroup, Input } from "reactstrap";
import data from "../../../data/data.json";
import { connect } from "react-redux";
import displayResult from "../../../appRedux/actions/result";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Alert } from 'reactstrap';

class AnyInput extends Component {
  state = {
    userInput: '',
    userInputArr: [],
    selectedWord: "",
    copied: false,
    isTooltipOpen: false,
    displayAlert: false,
    booleanQuery: false,
  }

  getselectword = () => {
    let curPos = document.getElementById("text1").selectionStart;
    let totalLenth = 0
    let selectedWord = null;
    let arrayIndex = null;
    let secondWord = null
    let thirdWord = null
    this.state.userInputArr && this.state.userInputArr.map((item, index) => {
      totalLenth += item.length;

      if (index === 0 && totalLenth >= curPos) {
        selectedWord = item;
        console.log(curPos, totalLenth, selectedWord, "1")
      }
      else if (index > 0 && !selectedWord && totalLenth >= curPos - index) {
        selectedWord = item;
        console.log(curPos, totalLenth, selectedWord, "2")
      }
      else if (!selectedWord && totalLenth >= curPos - index) {
        selectedWord = item
        console.log(curPos, totalLenth, selectedWord, "3")
      }

    })
    arrayIndex = this.state.userInputArr.findIndex((i) => i === selectedWord)
    if (arrayIndex !== -1) {
      if (arrayIndex === 0) {
        secondWord = this.state.userInputArr[arrayIndex + 1];
        thirdWord = this.state.userInputArr[arrayIndex + 2];
      }
      else if (arrayIndex === this.state.userInputArr.length - 1) {
        secondWord = this.state.userInputArr[arrayIndex - 1];
        thirdWord = this.state.userInputArr[arrayIndex - 2];
      }
      else {
        secondWord = this.state.userInputArr[arrayIndex - 1];
        thirdWord = this.state.userInputArr[arrayIndex + 1];
      }

    }

    this.setState({ selectedWord });
    console.log(selectedWord, secondWord, thirdWord)
    this.getResulte(selectedWord, secondWord, thirdWord, arrayIndex)

  }

  getResulte = async (selected, secondSelected, thirdSelected, wordIndex) => {
    const { result, displayResult } = this.props;
    let variations = result;
    let WordsKeys = []
    let isfound = await this.check(selected);
    if (isfound) {
      data.map((Item) => {
        if (Item.word === selected) {
          WordsKeys.unshift(Item)
          console.log(WordsKeys, "1")
        }
        else if (Item.word === secondSelected) {
          if (WordsKeys.length > 2) {
            WordsKeys.splice(1, 0, Item)
          } else if (wordIndex === this.state.userInputArr.length - 1) {
            WordsKeys.unshift(Item)
          } else {
            WordsKeys.push(Item)
          }
          console.log(WordsKeys, "2")
        }
        else if (Item.word === thirdSelected) {
          WordsKeys.push(Item)
          console.log(WordsKeys, "3")
        }
      });

      variations = WordsKeys;

      console.log(variations)
      displayResult(variations,)

    }

  }
  covert = (e) => {
    this.setState({ userInput: e.target.value }, () => {
      this.initializeInput()
    })
  }

  initializeInput = () => {
    // let userInputSpaces = this.state.userInput.replace(/\s/g, '')
    let userInputArr = this.state.userInput.split(",")
    let final = userInputArr.map(elment => {
      return elment.trim();
    })
    console.log(final)

    this.setState({ userInputArr: final })
  }


  async check(selectedWord) {
    const { result } = this.props;
    if (result && result.length > 0 && result[0].word === selectedWord) {
      return false
    }
    else {
      return true
    }
  }

  onAlerDismiss = () => {
    this.setState({ displayAlert: false })
  }


  render() {

    const { displayAlert } = this.state;
    const { booleanQuery, result } = this.props
    return (
      <div className="input-container">
        <h4><span>Any</span> of these keywords</h4>
        <p>Separate the words by comma</p>
        <FormGroup>
          <Input type="textarea" name="text" id="text1" rows="6" value={this.state.userInput} onChange={(e) => this.covert(e)} onClick={() => this.getselectword()} />
        </FormGroup>
        <div className="results">

          <p>
            Keyword variation
        <span>
              <i className="fa fa-question-circle"></i>
            </span>
          </p>
          {
            displayAlert && <Alert color="primary" isOpen={displayAlert} toggle={this.onAlerDismiss}>
              text copied to the clipboard
        </Alert  >
          }
          {
            result && result.map((Item, index) => {
              return (
                <div className="keyword-variations" key={index}>
                  <span className="main-word">{Item.word}<i className="fa fa-arrow-circle-right arrowIcon"></i></span>
                  <div className="variations-container">
                    {
                      Item.variations.map((variation, key) => {
                        return (
                          <CopyToClipboard text={variation} onCopy={() => this.setState({ copied: true, displayAlert: true })} key={key} ><span className="variation">{variation}</span></CopyToClipboard>
                        )

                      })
                    }
                    <CopyToClipboard text={booleanQuery ? Item.variations : Item.variations.join(" OR ")} onCopy={() => this.setState({ copied: true, displayAlert: true })}>
                      <span className="copy-all">Copy All</span>
                    </CopyToClipboard>
                  </div>

                </div>
              )
            })

          }
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    result: state.result.result,
  };
};

const mapDispachToProps = (dispach) => {
  return {
    displayResult: (result) => dispach(displayResult(result)),

  };
};

export default connect(mapStateToProps, mapDispachToProps)(AnyInput);