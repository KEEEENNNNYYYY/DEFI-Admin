import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Déconnexion réussie !");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Erreur lors de la déconnexion :", error);
            });
    };

    return (
        <nav className="navbar">
            {/* LOGO */}
            <div className="navbar-left">
                <img
                    src="/400_filter_nobg_67f7be5f53ddb.webp"
                    alt="Logo Défi Madagascar"
                    className="navbar-logo"
                />
                <h2 className="navbar-title">Admin</h2>
            </div>

            {/* DECONNEXION */}
            <button className="navbar-logout" onClick={handleLogout}>
                Déconnexion
            </button>
        </nav>
    );
}

export default Navbar;
