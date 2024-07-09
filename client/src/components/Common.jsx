import React from 'react'
import Navbar from '../elements/Navbar'

const Common = (props) => {
  return (
    <div>
    <Navbar/>
    {props.child}
    </div>
  )
}

export default Common