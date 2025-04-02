import { memo, useContext } from 'react'
import Dashboard from '../pages/Dashboard'
import SideBar from './SideBar'
import MyDashboard from '../pages/MyDashboard'
import AuthContext from '../context/authContext'

function Home() {
  const {authenticated} = useContext(AuthContext)
  return (
    <div className='flex gap-2'>
      <SideBar/>
      {authenticated ? <MyDashboard/>:
      <Dashboard/>}
    </div>
  )
}
export default memo(Home)