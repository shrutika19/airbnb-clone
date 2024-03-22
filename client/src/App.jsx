import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './context/UserContext'
import ProfilePage from './pages/ProfilePage'
import AccommodationPage from './pages/AccommodationPage'
import AccommodationForm from './pages/AccommodationForm'

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path='/account/places' element={<AccommodationPage />} />
          <Route path='/account/places/new' element={<AccommodationForm />} />
          <Route path='/account/places/:id' element={<AccommodationForm />} />

        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
