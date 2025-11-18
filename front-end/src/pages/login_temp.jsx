import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import logo from "../../public/400_filter_nobg_67f7be5f53ddb.webp";
import "../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAuthAction = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Ici, seul login admin (aucune inscription depuis ce formulaire)
            await signInWithEmailAndPassword(auth, email, password);
            alert("Connexion réussie !");
            navigate("/"); // redirige vers tableau de bord admin
        } catch (error) {
            setError("⚠️ Email ou mot de passe invalide !");
            console.error("Erreur de connexion:", error.message);
        }
    };

    return (
        <div className="admin-login-container">
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
