import React from 'react'

import workImg from '../../resources/working.png'

export default function About (props) {
  return (
    <div className='about-page'>
      <header className='secondary'>
        <div className='inner'>
          <h1>This project</h1>
        </div>
      </header>
      <div className='about-wrapper text-center'>
        <h3 className='text-center'>About</h3>
        <img src={workImg} />
        <h4>More info about this project are available in Github</h4>
        <a href='https://github.com/DavOnGit/poll-plex'
          className='button'>My GitHub</a>
      </div>
    </div>
  )
}
