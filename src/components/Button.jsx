import React from 'react'

//AFTER THIS BTN COMP WE CREATE INPUT COMP

//Generic button that can be used anywhere so that we dont have to define classes everywhere when we have to use btns
//the parameters we accept in button and how we use them
//children: the text passed to the button component
//type:button, the type of button, it can be submit etc too but we give it default button type
//bgColor and textColor are also given here some default values so that if the user doesn't pass we'll get these values otherwise will be overridden.
//className: mostly empty
//and after all these if we passed some other props so spreading those by '...props'

function Button({
    children,
    type='button',
    bgColor='bg-vlue-600',
    textColor='text-white',
    className='',
    ...props
}) {
  return (
    //we're using template literals here so we used backticks, but backticks are in JS so we used {} around them,, inside brackets we first defined some of the basic styling then we add the styling and variables we got in props i.e. bgcolor etc and even then if there are multiple props passed we get them as it is in {...props} form.
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>
      {children}
    </button>
  )
}

export default Button
