import React from 'react'
import Hero from './Hero' 
import Awards from './Awards';

import Education from './Education';
import OpenAccount from '../OpenAccount';

import Pricing from './Pricing';
import Statss from './Statss';


function HomePage() {
    return ( 
      <>
     
      <Hero/>
      <Awards/>
      <Statss/>
      <Pricing/>
      <Education/>
      <OpenAccount/>
      

      </>
     );
}

export default HomePage ;