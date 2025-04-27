import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Import useAuth

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 h-[70px] bg-[#090b13] flex justify-between items-center px-9 z-30 shadow-lg">
      <a className="p-0 w-[150px] mt-1 max-h-[70px] inline-block">
        <img src="/images/logo1.png" alt="car" className="block w-full" />
      </a>

      <div className="flex items-center h-full justify-end relative p-0 m-0 mr-auto ml-6 max-md:hidden">
        <Link to="/" className="flex items-center px-3 group">
          <img src="/images/home-icon.svg" alt="HOME" className="h-5 min-w-[20px] w-5" />
          <span className="text-[#f9f9f9] text-xs tracking-widest leading-[1.08] px-1 relative group-hover:before:scale-x-100 before:transition-all before:duration-300 before:ease-in-out before:origin-left before:content-[''] before:bg-[#f9f9f9] before:rounded-b before:absolute before:bottom-[-6px] before:left-0 before:right-0 before:h-0.5 before:opacity-0 group-hover:before:opacity-100 group-hover:before:visible before:scale-x-0">
            HOME
          </span>
        </Link>
        <Link to="/search" className="flex items-center px-3 group">
          <img src="/images/search-icon.svg" alt="SEARCH" className="h-5 min-w-[20px] w-5" />
          <span className="text-[#f9f9f9] text-xs tracking-widest leading-[1.08] px-1 relative group-hover:before:scale-x-100 before:transition-all before:duration-300 before:ease-in-out before:origin-left before:content-[''] before:bg-[#f9f9f9] before:rounded-b before:absolute before:bottom-[-6px] before:left-0 before:right-0 before:h-0.5 before:opacity-0 group-hover:before:opacity-100 group-hover:before:visible before:scale-x-0">
            SEARCH
          </span>
        </Link>
        <Link to="/voiture" className="flex items-center px-3 group">
          <img src="/images/car-removebg-preview.png" alt="VOITURE" className="h-5 min-w-[20px] w-5" />
          <span className="text-[#f9f9f9] text-xs tracking-widest leading-[1.08] px-1 relative group-hover:before:scale-x-100 before:transition-all before:duration-300 before:ease-in-out before:origin-left before:content-[''] before:bg-[#f9f9f9] before:rounded-b before:absolute before:bottom-[-6px] before:left-0 before:right-0 before:h-0.5 before:opacity-0 group-hover:before:opacity-100 group-hover:before:visible before:scale-x-0">
            VOITURE
          </span>
        </Link>
        <Link to="/categorie" className="flex items-center px-3 group">
          <img src="/images/car-removebg-preview.png" alt="categorie" className="h-5 min-w-[20px] w-5" />
          <span className="text-[#f9f9f9] text-xs tracking-widest leading-[1.08] px-1 relative group-hover:before:scale-x-100 before:transition-all before:duration-300 before:ease-in-out before:origin-left before:content-[''] before:bg-[#f9f9f9] before:rounded-b before:absolute before:bottom-[-6px] before:left-0 before:right-0 before:h-0.5 before:opacity-0 group-hover:before:opacity-100 group-hover:before:visible before:scale-x-0">
            CATEGORIE
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3 max-md:hidden">
        {user ? (
          <div className="flex items-center gap-3 text-white">
            <img src="/images/profile.webp" alt="Profile" 
              className="w-9 h-9 rounded-full object-cover border border-white"
            />
            <span className="font-semibold">{user.username}</span>
            
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/Login")}
              className="text-white bg-black/60 uppercase px-4 py-2 tracking-wider border border-[#f9f9f9] rounded hover:bg-[#f9f9f9] hover:text-black hover:border-transparent transition-all duration-200"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/SignUp")}
              className="text-white bg-black/60 uppercase px-4 py-2 tracking-wider border border-[#f9f9f9] rounded hover:bg-[#f9f9f9] hover:text-black hover:border-transparent transition-all duration-200"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
