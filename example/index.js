import React from 'react'
import { render } from 'react-dom'
import { Page } from '../src'
import { BrowserRouter, Link } from 'react-router'


class App extends React.Component {
  render() {
    return <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/one">to page one</Link></li>
          <li><Link to="/two">to page two</Link></li>          
          <li><Link to="/asd">404</Link></li>
        </ul>
        
        <Page pattern="/one" exactly component="./a.js" />
        <Page pattern="/two" exactly component="./b.js" />
      
      </div>
    </BrowserRouter>
  }
}


render(<App/>, document.getElementById('app'))
