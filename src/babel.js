let template = require('babel-template')

// let boilerplate = 

// let wrapper = template(boilerplate + ')')

// let wrapperWithName = template(boilerplate + ', NAME)')

let TRUE = template('true')

function replace(attr) {
  console.log(attr)
  return template(`callback => require.ensure([], require => {
  let success = false, ret
  try{
    ret = require('${attr.value.value}')
    success = true
  }
  catch(err) {
    callback(err) 
  }
  if(success){
    callback(null, ret)  
  }
})`)()  
  
}

module.exports = function ({ types: t }) {
  return {
    visitor: {
      JSXElement(path) {
        if(path.node.openingElement.name.name === 'Page') {
          // let chunkName = path.node.openingElement.attributes.filter(attr => 
          //   attr.name.name === 'chunkName')[0]
          // chunkName = chunkName ? chunkName.value : undefined

          let included = path.node.openingElement.attributes.filter(attr => 
            attr.name.name === 'include').length > 0
          
          if(!included) {
            console.log('swapping')
            path.node.openingElement.attributes.forEach((attr, i) => {
              if(attr.name.name === 'component') {
                path.node.openingElement.attributes[i] = t.jSXAttribute(t.jSXIdentifier('component'), t.jSXExpressionContainer(replace(attr).expression))
              }
            })
            
            path.node.openingElement.attributes.push(
              t.jSXAttribute(t.jSXIdentifier('transpiled'), 
              t.jSXExpressionContainer(TRUE().expression)))  
          }          
        }
      }
    } 
  }
}


