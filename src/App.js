import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/common/Form';
import Home from './components/Home';
import Reference from './components/Reference.js';
import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import {app} from './firebase-config.js'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          console.log(error.code)
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
        })
    }
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/home')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        })
    }
  }
  let location = useLocation();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    
    if (authToken) {
      if(location.pathname != ""){
        navigate(location.pathname)
      }
      else{
        navigate('/home')
      }
      
    }
    else {
      navigate('/login')
    }
  }, [])
  return (
    <div className="App h-dvh bg-gray-700">
      <>
        <ToastContainer />
        <Routes>
          <Route
            path='/login'
            element={
              <Form
                title="LOGIN"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}
                otherAuthentication="REGISTER"
                goToOtherAuthenticationPage={() => navigate('/register')}
              />
            }
          />
          <Route
            path='/register'
            element={
              <Form
                title="REGISTER"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)}
                otherAuthentication="LOGIN"
                goToOtherAuthenticationPage={() => navigate('/login')}
              />
            }
          />

          <Route
            path='/home'
            element={
              <Home />
            }
          />
          <Route
            path='/reference'
            element={
              <Reference />
            }
          />
          <Route
          path='/plan'
          element={
            <div> hello</div>
          }
          />
          <Route
            path='/play'
            element={
              <div> hello</div>
            }
          />
        </Routes>
      </>
    </div>
  );
}

export default App;