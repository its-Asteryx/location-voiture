import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';
import SignUp from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Voiture from './components/Voiture';
import Reservation from './components/Reservation'; // Import Reservation component
import Categorie from './components/Categorie';
import CategoryDetail from './components/CategorieDetails';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import { AuthProvider } from './context/authContext'; // Import AuthProvider
import  Recherche from './components/Recherche'; // Import Search component
import VoitureDetail from './components/VoitureDetail';
import AddCar from './components/AddCar';

function App() {
  return (
    <div className="App">
      <p>App Loaded</p>
      <AuthProvider>
        {/* AuthProvider wraps the entire application to provide authentication context */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/category/:type" element={<CategoryDetail />} />
          <Route path="/search" element={<Recherche />} />
          
          

          {/* Only protect the Reservation route */}
          <Route 
            path="/reservation" 
            element={
              <PrivateRoute>
                <Reservation />
              </PrivateRoute>
            }
          />

          {/* Non-protected routes */}
          <Route path="/voiture" element={<Voiture />} />
          <Route path="/voiture/:id" element={<VoitureDetail />} /> 
          <Route path="/categorie" element={<Categorie />} />
          <Route path="/category/:categoryName" element={<CategoryDetail />} />
          <Route path="/addcar" element={<AddCar />} />
         
        </Routes>
      </Router>
      </AuthProvider>
      {/* AuthProvider wraps the entire application to provide authentication context */}
    </div>
  );
}

export default App;
