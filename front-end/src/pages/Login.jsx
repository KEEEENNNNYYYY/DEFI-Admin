import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import logo from "../../public/400_filter_nobg_67f7be5f53ddb.webp";
import "../styles/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successPopup, setSuccessPopup] = useState(false);
    const navigate = useNavigate();

    const handleAuthAction = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);

            // Affiche le popup succès
            setSuccessPopup(true);

            setTimeout(() => {
                setSuccessPopup(false);
                navigate("/");
            }, 2000);
        } catch (error) {
            setError("⚠️ Email ou mot de passe invalide !");
            console.error("Erreur de connexion:", error.message);
        }
    };

    return (
        <div className="admin-login-container">

            {/* POPUP SUCCÈS */}
            {successPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h3 className="popup-title">Connexion réussie</h3>
                        <p className="popup-text">Bienvenue sur l’espace administrateur.</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleAuthAction} className="admin-login-form">
                <img src={logo} alt="Logo Défi Madagascar" className="login-logo" />
                <h2>Admin Login</h2>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="votre.email@defi.mg"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="minimum 6 caractères"
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="submit-button">
                    Connexion
                </button>
            </form>
        </div>
    );
}

export default Login;
