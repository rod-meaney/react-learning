import React from 'react';
import Sound from 'react-sound';
import soundfile from '../media/incorrect.wav'

class InCorrect extends React.Component {
  render() {
    return (
      <Sound
      url={soundfile}
      playStatus={Sound.status.PLAYING}
      onLoading={this.handleSongLoading}
      onPlaying={this.handleSongPlaying}
      onFinishedPlaying={this.handleSongFinishedPlaying}
      />
     );
  }
}

export default InCorrect;