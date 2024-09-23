import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    
    // Redirigir al login
    navigate('/login');
    
  }, [navigate]);

  return (
    <></>
  );
};

export default Logout;
