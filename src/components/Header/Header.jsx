import React from 'react'
import { Component, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux' //to go see in store if the user is logged in or not
import { useNavigate } from 'react-router-dom'
import { Container } from 'postcss'


function Header() {
  //to see if user is authenticated/logged in. Checking if status attribute defined in authSlice in store folder is true or not
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  //in navigatiion bars, we create an array of objects and loop on it.

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus }, //if user is logged in we dont need to show login or signup btns, thats why we did false
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },

  ]


  //jo html element repeat  horha hota hai wahan keys lagani hoti, so we make keys on <li> not on the <ul>. also for now we're taking item.names
  //when a button is clicked, it'll be navigated to a specific  url, item.slug in this case.
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70ppx' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item, index) => 
                item.active?(
                  <li key={item.name}>
                    <button 
                    onClick={()=>navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    >
                    {item.name}</button>
                  </li>
                ):null
            )}
{/* if user is logged in then we show the logoutbtn otherwise no. Conditional Rendering*/}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
