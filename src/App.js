import { Route, Routes, Link} from 'react-router-dom';
import {Component, useState} from "react";
import { Layout } from './components/layout';

import {Events} from './routes/events-route';
import {Loginthing} from './routes/login';
import {SpecificEvent} from './routes/specific';
import {NotFound} from './components/notFound';
import s from './App.css'


export default function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Layout title="Events" footer={
      <div class="login">
        <div class="border"></div>
        <Link to="/events/login" class="link"> LOGIN PAGE </Link>
        {!isLoggedIn && <button class="button" onClick={() => setIsLoggedIn(true)}>login</button>}
        {isLoggedIn && <p>you are logged in as test</p>}
        {isLoggedIn && <button class="button" onClick={() => setIsLoggedIn(false)}>log out</button>}
      </div>
    }>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/events/:id" element={<SpecificEvent />} />
        <Route path="/events/login" element={<Loginthing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

