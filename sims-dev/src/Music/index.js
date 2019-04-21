import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMusic} from '@fortawesome/free-solid-svg-icons'


class Music extends Component {
    constructor(props) {
    super(props);
    this.state = {
      play: true,
      pause: false
    };
    this.url = "http://streaming.tdiradio.com:8000/house.mp3";
    this.audio = new Audio(this.url);
    this.pause = this.pause.bind(this);
  }
  componentDidMount(){
      this.audio.play();
  }
  pause(){
    let isPlaying = this.state.play
    this.setState({ play: !isPlaying },() => {
        (isPlaying) ? this.audio.pause() : this.audio.play();
    });
  }

  render() {
    return (
        <FontAwesomeIcon icon={faMusic} onClick={this.pause} />
    );
  }
}


export default Music