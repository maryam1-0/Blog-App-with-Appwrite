import React from 'react'


//A container accepts our properties as children
//Just a box/container and we add styling properties in it
//mx-auto to get in middle
 
function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'> 
      {children}
    </div>
  )
}

export default Container
