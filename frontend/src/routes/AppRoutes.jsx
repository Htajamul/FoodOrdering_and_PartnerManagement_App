
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import Signup from '../components/SignUp';
import SignIn from '../components/SignIn';
import { Home } from '../pages/Home';
import FoodPartnerSignUp from '../components/FoodPartnerSignUp';
import FoodPartnerSignIn from '../components/FoodPartnerSignIn';
import { CreateFood } from '../pages/CreateFood';
import Profile from '../pages/Profile';
import { BottomNav } from '../pages/BottonNav';
import ProtectedRoute from '../layout/ProtectedRout';
import Save from '../pages/Save';
import VisitStore from '../pages/VisitStore';
import MainLayout from '../layout/MainLayout';
import DefaultRoute from '../layout/DefaultRout';
import Update from '../pages/Update';
export const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<DefaultRoute />} />
        <Route path='/signUp' element={<Signup />} />
        <Route path='/signIn' element={<SignIn />} />
        {/* <Route path='/partner/signUp' element={<FoodPartnerSignUp />} /> */}
        {/* <Route path='/partner/signIn' element={<FoodPartnerSignIn />} /> */}


        <Route element={<ProtectedRoute />}>
          {/*  Pages WITH BottomNav */}
          <Route element={<MainLayout />}>

            <Route path='/store/:id' element={<VisitStore />} />
            {/* <Route path='/store' element={<VisitStore />} /> */}
            <Route path='/partner/signUp' element={<FoodPartnerSignUp />} />
            <Route path='/partner/signIn' element={<FoodPartnerSignIn />} />
            <Route path='/create-food' element={<CreateFood />} />
            <Route path='/update-food/:foodId' element={<Update/>} />

            <Route path='/profile' element={<Profile />} />
            <Route path='/saved' element={<Save />} />
            <Route path='/home' element={<Home />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  )
}

