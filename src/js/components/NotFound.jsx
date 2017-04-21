import React from 'react'

import notFoundImg from '../../resources/Exercise.gif'

export default function NotFound () {
  return (
    <div className='my-polls'>
      <header>
        <div className='inner'>
          <h1>Sorry! We couldn't find what you're looking for</h1>
          <br />
          <h3>Please check that URL is correct</h3>
        </div>
      </header>
      <img src={notFoundImg} className='notFoundImg' />
      <header className=''>
        <div className='inner'>
          <h3>...maybe is just a type error...</h3>
          <h3>...maybe is just a fetching error...</h3>
          <h3>...we're still searching it...</h3>
        </div>
      </header>
    </div>
  )
}
