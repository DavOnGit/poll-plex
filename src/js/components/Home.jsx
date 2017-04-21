import React from 'react'

import PollList from './PollList'

export default function Home (props) {
  return (
    <div>
      <header>
        <div className='inner'>
          <h1>Poll Plex</h1>
          <h3>Vote&nbsp;the&nbsp;polls&nbsp;you&nbsp;like and&nbsp;share&nbsp;them...</h3>
          <h3>...or&nbsp;register to&nbsp;make new&nbsp;ones!</h3>
        </div>
      </header>
      <PollList />
    </div>
  )
}
