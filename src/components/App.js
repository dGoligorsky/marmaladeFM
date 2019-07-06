/* global Mixcloud */
import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'
import Archive from './Archive'
import About from './About'

import Mix from './Mix'
import mixesData from '../data/mixes'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        // whether a mix is currently playing
        playing: false,
        //the id of the current mix
        currentMix: '',
        // this will be equal to our data file of mixes
        mixIds: mixesData,
        mix: null,
        mixes: []
    }
  }

  // /fanujanne/fanu-presents-breaks-n-beats-podcast-4/

  fetchMixes = async () => {

    const {mixIds} = this.state
    console.log(mixIds)

    // here we loop over our mix ids and fetch each one
    mixIds.map(async id => {
      try {
        // always remember to use await when using fetch in an async function
        const response = await fetch(`https://api.mixcloud.com${id}`)
        const data = await response.json()

        // put the mix into our state
        this.setState((prevState, props) => ({
          // here we add our data onto the end of all our previous state using the spread
          mixes: [...prevState.mixes, data]
        }))
        // console.log(data)
      } catch(error) {
        console.log(error)
      }
    })

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

  };

  componentDidMount() {
    // when our app component is all loaded onto the page, out componentDidMount gets called and we can be sure everything is ready, so we then run our mountAudio() method
    this.mountAudio()
    this.fetchMixes()
  }

  actions = {

    // we group our methods together inside of an object called actions

    togglePlay: () => {
      // we want to togglePlay() on our widget
      this.widget.togglePlay();
    },
  
    playMix: mixName => {
      // if the mixName is the same as the currently playing mix, we want to pause it instead
      const {currentMix} = this.state
      if (mixName === currentMix) {
        // when our code sees a return statement, it will stop running here and exit the function
        return this.widget.togglePlay()
      } 

      // update the current mix in our state with the mixName
      this.setState({
        currentMix: mixName
      })
      // load a new mix by its name and then start playing it immediately
      this.widget.load(mixName, true)
    }

  }

  render() {

    // if the array is empty, we need to assign it a default value of an empty object aka {}
    const [firstMix = {}] = this.state.mixes

    return (
        // Router wraps our whole page and lets us use react-router
        <Router>
          {/* { this div contains everything } */}
          <div>
            {/* { this div contains our page (excluding audio player) } */}
            <div className='flex-l justify-end'>
              <FeaturedMix {...this.state} {...this.actions} {...firstMix} id={firstMix.key}/>
              <div className='w-50-l relative z-1'>
                <Header />
                {/* { Routed Page } */}

                {/* { here we pass our state and our actions down into the home component so that we can use them } */}
                <Route exact path="/" render={() => <Home {...this.state} {...this.actions}/>} />
                <Route path="/archive" render={() => <Archive {...this.state} {...this.actions} />}/>
                <Route path="/about" render={() => <About {...this.state} />}/>
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

