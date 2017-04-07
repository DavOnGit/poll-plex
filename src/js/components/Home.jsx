import React from 'react'

import PollList from './PollList'

export default function Home (props) {
  console.log(props.routes)
  return (
    <div>
      <p>Location :{props.location.pathname.toString()}</p>
      <p>POOLS</p>
      <PollList />
    </div>
  )
}
