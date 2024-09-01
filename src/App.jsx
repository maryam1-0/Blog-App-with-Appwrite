
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import './App.css'
import authService from './appWrite/auth'
import { login,logout } from './store/authSlice'
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom'


//we'll get most of the work done here, cuz initally we'll check through state if the user is logged in or not, if he is we'll show him the posts/dashboard etc but if he's not then we can send some msg/alert etc that u cant see stuff.

function App() {
  const [loading, setLoading] = useState(true) //when we fetch data, from anywhere, appwrite in this case, it'll take some time, so whenever we get some data from db etc we should make this loading state and then we can do conditional rendering, k if loading then this if not loading then show data etc.By default we keep it true, meaning when our app loads it is in loading state cuz useeffect is doing smthn,fetching stuff, and when useeffect does, we do the loading state false in there. 
  const dispatch = useDispatch() //when we use redux with react, it is necessary cuz we need to change state 


  //when app loads, in useeffect, ask the auth service if user is logged in or not

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
    }).finally(()=>setLoading(false));
  }, [])

return !loading ? (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
    <div className='w-full block'>
      <Header/>
      <main></main>
      <Footer/>
    </div>
  </div>
  
) : (<div>Loading...</div>)
}

export default App
