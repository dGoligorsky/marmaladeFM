import React from 'react'
import Mix from './Mix'

const Home = props => (

    <div className='flex flex-wrap justify-between mixes ph3 ph4-l'>

        {props.currentMix}

        {/* { here we loop through all of our mixes} */}
        <div className='mix mb4'>
            {/* { our mix goes in here } */}
            {/* { here we can pass through our spread of props } */}
            <Mix name='This is the Blues' id='/adamkvasnica3/this-is-the-blues/' {...props} />
        </div>

        <div className='mix mb4'>
            {/* { our mix goes in here } */}
            {/* { here we can pass through our spread of props } */}
            <Mix name='BIS Radio Show #997 with Tim Sweeney' id='/bisradio/bis-radio-show-997-with-tim-sweeney/' {...props} />
        </div>

        <div className='mix mb4'>
            {/* { our mix goes in here } */}
            {/* { here we can pass through our spread of props } */}
            <Mix name='Epochs Fables Vol. 331' id='/kingstonpork/epochs-fables-vol331/' {...props} />
        </div>

    </div>

)

export default Home