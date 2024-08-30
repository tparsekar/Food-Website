import React from 'react'
import UserContext from '../utils/UserContext'
import { useContext } from 'react'

const About = () => {
  return (
    <div>
      <h1>About Us Page</h1>
      <div>
        LoggedIn User
        <UserContext.Consumer>
          {({loggedInUser})=>
            <h1 className='text-xl font-bold'>{loggedInUser}</h1>
          }
        </UserContext.Consumer>
      </div>
    </div>
  )
}

export default About
