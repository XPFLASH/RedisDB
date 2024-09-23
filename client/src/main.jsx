import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './pages/registro';
import Consulta from './pages/consulta';
import Login from './pages/login';
import Logout from './pages/logout.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import PrivateRoute from './utils/privateRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={(
          <div id='home'>
            <header>
              <h1 id='h1Home'>Dashboard con integración de FaunaDB</h1>
            </header>
            <section id='sectionHome'>
              <h3>¿Qué es FaunaDB en la nube?</h3>
              <p>FaunaDB es una base de datos serverless moderna diseñada para aplicaciones en la nube. Ofrece una plataforma global 
                distribuida que permite a los desarrolladores construir aplicaciones escalables sin la complejidad de gestionar servidores 
                o infraestructura. FaunaDB facilita el almacenamiento y consulta de datos de manera segura, con soporte para transacciones ACID 
                y una API basada en GraphQL y FQL (Fauna Query Language).
              </p>
              
              <p>Al estar en la nube, FaunaDB se encarga de la replicación de datos en múltiples regiones, garantizando alta disponibilidad y baja 
                latencia en todo el mundo. Además, su arquitectura serverless permite que los desarrolladores paguen únicamente por el uso que hagan de 
                la base de datos, eliminando la necesidad de aprovisionar capacidad de forma manual.
              </p>
            </section>
          </div>
        )} />
        <Route path="/login" element={<Login />}/>
        <Route path="/registro" element={<Registro />}/>
        <Route path="/consulta" element={ <PrivateRoute><Consulta /></PrivateRoute>}/>
        <Route path="/contact" element={ <PrivateRoute><Contact /></PrivateRoute>}/>
        <Route path="/about" element={ <PrivateRoute><About /></PrivateRoute>}/>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  </StrictMode>,
)
