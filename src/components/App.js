/* global Mixcloud */
import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'
import Mix from './Mix'

const Archive = () => <h1>Archive</h1>
const About = () => <h1>About</h1>

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        // whether a mix is currently playing
        playing: false,
        //the id of the current mix
        currentMix: ''
    }
  }

  mountAudio = async() => {
    // when we use th this keyword, our widget is now accessible anywhere inside the component
    this.widget = Mixcloud.PlayerWidget(this.player)
    // here we wait for our widget to be ready before continuing
    await this.widget.ready

    this.widget.events.pause.on(() => this.setState({
      playing: false
    }))
    this.widget.events.play.on(() => this.setState({
      playing: true
    }))

    console.log(this.widget)
  };

  componentDidMount() {
    // when our app component is all loaded onto the page, out componentDidMount gets called and we can be sure everything is ready, so we then run our mountAudio() method
    this.mountAudio()
  }

  actions = {

    // we group our methods together inside of an object called actions

    togglePlay: () => {
      // we want to togglePlay() on our widget
      this.widget.togglePlay();
    },
  
    playMix: mixName => {
      // update the current mix in our state with the mixName
      this.setState({
        currentMix: mixName
      })
      // load a new mix by its name and then start playing it immediately
      this.widget.load(mixName, true)
    }

  }

  render() {
    return (
        // Router wraps our whole page and lets us use react-router
        <Router>
          {/* { this div contains everything } */}
          <div>
            {/* { this div contains our page (excluding audio player) } */}
            <div className='flex-l justify-end'>
              <FeaturedMix />
              <div className='w-50-l relative z-1'>
                <Header />
                {/* { Routed Page } */}

                {/* { here we pass our state and our actions down into the home component so that we can use them } */}
                <Route exact path="/" component={() => <Home {...this.state} {...this.actions} />} />
                <Route path="/archive" component={Archive} />
                <Route path="/about" component={About} />
              </div>
            </div>
            {/* { AudioPlayer } */}
            <iframe className='player db fixed bottom-0 z-5' width="100%" height="60" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fdj_hacks%2F" frameBorder="0" ref={player => (this.player = player)}></iframe>
        </div>
      </Router>
    );
  }
}

export default App;

