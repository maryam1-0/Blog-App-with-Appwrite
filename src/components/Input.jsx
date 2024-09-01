import React, { useId } from 'react'

//AFTER BTN COMPONENT WE CREATED THIS

//when to use forwardref, give example: So we're making a login page/form,in which we have multiple input fields,same ones, for username,password etc but these input fiels are kept separately in a file, just like right now input file is this one and login page/form is going to be another one, so we need to have access to the inpiut's state in the login page right? we need to pass the reference from input components to the login page, so for that we use a react hook called forwardRef. 
//PARAMETERS:
//label: input's gonna be used in so many places so somewhere it can be username password etc etc
//type: it can be password/text/email etc type but by default we give it text type

//ref: whatever component or file uses it, it'll also pass a reference.
const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {

    const id = useId()

    //Conditional rendering: if label is passed then we show the label (built-in label component with our passed label in it.) 
    //in htmlfor we give id that we created thhat'll generate unique id everytime and it's not compulsory you can remove it. its used here for seo/accessibility purposes
    //the ref we took as a prop from user will be passed in here as ref={ref}, this will send the reference to the parent component (in which input component is used  )
    //the unique id generated is on your label and input field both so now when someone clicks on the label, then exactly that input is highlighted and cursor goes there.
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>{label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input
