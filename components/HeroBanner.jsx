import Link from 'next/link'
import React from 'react'

import {urlFor} from '../lib/client'

const heroBanner = ({heroBanner}) => {
  return (
    <div className='hero-banner-container'>
       <div>
        <p className='beats-solo'>{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} className='hero-banner-image'/>

        <div>
          <Link href={`/product/ID`}>
             <button type="button">{heroBanner.buttonText}</button>
          </Link>
        </div>

        <div>
          <h5 className='desc' >{heroBanner.desc}</h5>
        </div>

       </div>
    </div>
  )
}

export default heroBanner