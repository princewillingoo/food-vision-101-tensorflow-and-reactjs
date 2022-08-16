import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMediumM, faGithub  } from '@fortawesome/fontawesome-free-brands'

const Footer = () => (
  <footer>
    <a 
      href='https://medium.com/' 
      title='Medium Article'
      className={'small-button medium'}>
      <FontAwesomeIcon icon={faMediumM} size='3x' color='#fff' />
    </a>
    <div>
    </div>
    <a 
      href='https://github.com/princewillingoo' 
      title='Github repo'
      className={'small-button github'}>
      <FontAwesomeIcon icon={faGithub} size='3x' color='#fff' />
    </a>
  </footer>
)
export default Footer