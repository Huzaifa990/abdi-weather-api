import React from 'react'
import clouds from "../images/WeatherIcons.gif";

export default function Error() {
  return (
    <div className='error-container'>
        <h1>An Error Occured</h1>
      <img src={clouds} className='icon' alt='error'/>
      <p>Location Access Permition Denied!</p>
      <p>Please allow the location and reload the page!</p>
    </div>
  )
}
