import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/common/Form';
import Home from './components/Home';
import Reference from './components/reference/Reference.js';
import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CodexPage from './components/reference/CodexPage.js';
import ArmyRulesPage from './components/reference/ArmyRulesPage.js';
import DetachmentsPage from './components/reference/DetachmentsPage.js';
import Detachment from './components/reference/Detachment.js';
import Enhancements from './components/reference/Enhancments.js';
import Stratagems from './components/reference/Stratagems.js';
import DatasheetsPage from './components/reference/DatasheetsPage.js';
import Datasheet from './components/reference/Datasheet.js';
import ListsPage from './components/listBuilding/ListsPage.js';
import ChooseFaction from './components/listBuilding/ChooseFaction.js';
import ChooseDetachment from './components/listBuilding/ChooseDetachment.js';
import ChooseSize from './components/listBuilding/ChooseSize.js';
import ChooseName from './components/listBuilding/ChooseName.js';
import ShowList from './components/listBuilding/ShowList.js';
import AddCharacter from './components/listBuilding/AddCharcater.js';
import ConfigureCharacter from './components/listBuilding/ConfigureCharacter.js';
import AddBattleline from './components/listBuilding/AddBattleline.js';
import ConfigureUnit from './components/listBuilding/ConfigureUnit.js';
import AddTransport from './components/listBuilding/AddTransport.js';
import AddOther from './components/listBuilding/AddOther.js';


function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const version = "0.0.1"
  let navigate = useNavigate();

  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/')
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
          else { toast.error(error.code) }
        })
    }
    if (id === 2) {
      const credential = createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
          else { toast.error(error.code) }
        }
        )


    }
  }
  let location = useLocation();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      if (location.pathname != "") {
        navigate(location.pathname)
      }
      else {
        navigate('/')
      }

    }
    else {
      navigate('/login')
    }
  }, [])

  const auth = getAuth();
  var uid;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      uid = user.uid;
      localStorage.setItem("uid", uid);
    } else {
      uid = undefined
    }
  });

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
            path='/'
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
            path='/reference/:codex/'
            element={
              <CodexPage />
            }
          />
          <Route
            path='/reference/:codex/army-rules'
            element={
              <ArmyRulesPage />
            }
          />
          <Route
            path='/reference/:codex/detachments'
            element={
              <DetachmentsPage />
            }
          />
          <Route
            path='/reference/:codex/detachments/:detachment'
            element={
              <Detachment />
            }
          />
          <Route
            path='/reference/:codex/detachments/:detachment/enhancments'
            element={
              <Enhancements />
            }
          />
          <Route
            path='/reference/:codex/detachments/:detachment/stratagems'
            element={
              <Stratagems />
            }
          />
          <Route
            path='/reference/:codex/datasheets'
            element={
              <DatasheetsPage />
            }
          />
          <Route
            path='/reference/:codex/datasheets/:datasheet'
            element={
              <Datasheet />
            }
          />
          <Route
            path='/plan'
            element={
              <ListsPage
                uid={uid}
              />
            }
          />
          <Route
            path='/plan/:list'
            element={
              <ShowList/>
            }
          />
          <Route
            path='/plan/:list/configure-unit'
            element={
              <ConfigureUnit/>
            }
          />
          <Route
            path='/plan/:list/configure-character'
            element={
              <ConfigureCharacter/>
            }
          />
          <Route
            path='/plan/:list/add-character'
            element={
              <AddCharacter/>
            }
          />
          <Route
            path='/plan/:list/add-character/configure-character'
            element={
              <ConfigureCharacter/>
            }
          />
          <Route
            path='/plan/:list/add-battleline'
            element={
              <AddBattleline/>
            }
          />
          <Route
            path='/plan/:list/add-battleline/configure-unit'
            element={
              <ConfigureUnit/>
            }
          />
          <Route
            path='/plan/:list/add-transport'
            element={
              <AddTransport/>
            }
          />
          <Route
            path='/plan/:list/add-transport/configure-unit'
            element={
              <ConfigureUnit/>
            }
          />
          <Route
            path='/plan/:list/add-other'
            element={
              <AddOther/>
            }
          />
          <Route
            path='/plan/:list/add-other/configure-unit'
            element={
              <ConfigureUnit/>
            }
          />
          <Route
            path='/plan/choose-faction'
            element={
              <ChooseFaction/>
            }
          />
          <Route
            path='/plan/choose-faction/choose-detachment'
            element={
              <ChooseDetachment/>
            }
          />
          <Route
            path='/plan/choose-faction/choose-detachment/choose-size'
            element={
              <ChooseSize/>
            }
          />
          <Route
            path='/plan/choose-faction/choose-detachment/choose-size/choose-name'
            element={
              <ChooseName/>
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