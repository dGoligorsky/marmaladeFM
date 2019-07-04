import React, {Component} from 'react';
import FeaturedMix from './FeaturedMix';
import Header from './Header';


class App extends Component {
  render() {
    return (
      // this div contains everything
      <div>
        {/* { this div contains our page (excluding audio player) } */}
        <div className='flex-1 justify-end'>
          <FeaturedMix />
          <div className="w-50-l relative z-1">
            <Header />
            {/* { Routed Page } */}
          </div>
        </div>
        {/* { AudioPlayer } */}
        <iframe className="player db fixed bottom-0 z-5" width="100%" height="60" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FTheVinylFactory%2Fdiscovering-the-80s-swedish-remix-phenomenon-with-mount-liberation-unlimited%2F" frameBorder="0" ></iframe>
      </div>
    );
  }
}

export default App;
