import React from 'react'
import { Match } from 'react-router'
// let isBrowser = typeof document !== 'undefined'  

class Load extends React.Component {
  static defaultProps = {
    renderLoading() { return <span>loading...</span> }
  }
  constructor(props) {
    super(props)
    if(!this.props.transpiled) { 
      if(this.props.defer) {
        // todo - prevent evaluation?
        return  
      }
      // this.state = {
      //   loaded: require(this.props.component) // this should kick in on node (without the plugin)
      // }
      return 
    }

    // possible async load 
    this.state = {
      loaded: undefined
    }   
    let sync = true

    this.props.component((err, loaded) => {
      if(err) {
        if(!this.props.onError) {
          throw err
        }
        this.props.onError(err)        
      }
      if(sync) {
        this.state.loaded = loaded
      }
      else {
        this.setState({ loaded })
      }
    })
    sync = false 
  }
  unstable_handleError(err) {
    if(!this.props.onError) {
      throw err
    }
    this.props.onError(err)
  }
  
  componentWillReceiveProps() {
    // hot loading and stuff 
  } 

  render() {
    // return this.state.loaded ? this.props.children(this.state.loaded) : this.props.renderLoading()
    
    let Component = this.state.loaded
    if(Component && Component.default) { // es6 jiggery 
      Component = Component.default
    }
    // return <Match {...props} render={x => Component ? <Component {...x}/> :  this.props.renderLoading(x)}/>
    return Component ? <Component {...this.props.passProps}/> :  this.props.renderLoading(this.props.passProps)

  }
}

export class Page extends React.Component {
  render() {
    let { component, renderLoading, onError, passProps, transpiled, ...props } = this.props // throwaway component, since we're using loading mechanism from above 
    return <Match {...props} render={ ()=> 
      <Load transpiled={transpiled} component={component} renderLoading={renderLoading} onError={onError} passProps={passProps}/> } />
  }
}
