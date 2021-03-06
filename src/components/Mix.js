import React from 'react';
import PlayButton from './PlayButton'
import PlayMix from './PlayMix'

// here we pick out our name prop, and then the rest of the props we pass on through
const Mix = ({name, pictures, ...props}) => (
  <div className="aspect-ratio aspect-ratio--3x4 pointer bg-black cover bg-center">

    <PlayMix {...props}>
        <div 
            className="ph3 pv4 aspect-ratio--object mix-overlay"
            style={{backgroundImage: `url(${pictures.extra_large})`}}
        >
            <div className="flex items-center relative z-2">
                <h1 className="f4 f3-l mv0 white ttu biryani pr2 lh-title">{name}</h1>
                {/* PlayButton goes here */}
                <PlayButton />
            </div>
        </div>
    </PlayMix>

  </div>
);

export default Mix