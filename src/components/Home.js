import React from 'react'
import Mix from './Mix'

const Home = ({mixes, ...props}) => (

    <div className='flex flex-wrap justify-between mixes ph3 ph4-l'>

        {/* // we slice the array by starting at index 0 and taking the first 6 entries in the array */}
        {mixes.slice(0,6).map(mix => (
            <div className='mix mb4'>
            {/* { our mix goes in here } */}
            {/* { here we can pass through our spread of props } */}
            {/* { here we pass through the id for the mix to play with } */}
            <Mix {...props} {...mix} id={mix.key}/>
         </div>

        ))}

    </div>

)

export default Home