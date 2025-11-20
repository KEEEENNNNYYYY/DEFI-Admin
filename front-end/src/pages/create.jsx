import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import Navbar from "../components/ComponentsBar";

function Create() {
    const [name, setName] = useState("");
    const [contenu, setContenu] = useState("");
    const [uploaded, setUploaded] = useState({ imageUrl: "", publicId: "" });
    const [loading, setLoading] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/items`, {
                name,
                contenu,
                imageUrl: uploaded.imageUrl,
                publicId: uploaded.publicId
            });

            // Afficher écran de chargement 3 secondes
            setTimeout(() => {
                setLoading(false);
                setSuccessPopup(true); // puis afficher le popup
            }, 3000);

        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création.");
            setLoading(false);
        }
    };

    const closePopup = () => {
        setSuccessPopup(false);
        navigate("/"); // redirige après fermeture
    };

    return (
        <>
            {/* Écran de chargement */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>Création en cours...</p>
                </div>
            )}

            {/* Popup succès */}
            {successPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2>✅ Succès !</h2>
                        <p>L'élément a été créé avec succès.</p>
                        <button onClick={closePopup} className="popup-btn">OK</button>
                    </div>
                </div>
            )}
            <Navbar onLogout={() => { }} />
            {/* Formulaire création */}
            <div className="create-container">
                <button onClick={() => navigate("/")} className="back-btn">← Retour</button>

                <h1 className="create-title">Créer un nouvel élément</h1>

                <form onSubmit={handleSubmit} className="create-form">
                    <div className="form-group">
                        <label><strong>Nom :</strong></label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Titre du projet"
                        />
                    </div>

                    <div className="form-group">
                        <label><strong>Image :</strong></label>
                        <UploadImage onUpload={setUploaded} />
                    </div>

                    <div className="form-group">
                        <label><strong>Contenu :</strong></label>
                        <textarea
                            value={contenu}
                            onChange={(e) => setContenu(e.target.value)}
                            placeholder="Détails du projet..."
                        />
                    </div>

                    <button type="submit" disabled={loading} className="submit-btn">
                        Créer
                    </button>
                </form>
            </div>

            <style>{`
                /* Écran de chargement */
                .loading-overlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: rgba(0,0,0,0.7);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    color: white;
                    font-size: 24px;
                    font-family: 'Georgia', serif;
                }
                .loading-spinner {
                    width: 60px;
                    height: 60px;
                    border: 6px solid #fff;
                    border-top: 6px solid transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* Popup succès */
                .popup-overlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }
                .popup-box {
                    background: #fff;
                    padding: 30px 40px;
                    border-radius: 20px;
                    box-shadow: 0 12px 35px rgba(0,0,0,0.15);
                    text-align: center;
                    font-family: 'Georgia', serif;
                    max-width: 350px;
                    width: 90%;
                }
                .popup-box h2 {
                    font-size: 1.5rem;
                    color: #0f172a;
                    margin-bottom: 15px;
                }
                .popup-box p {
                    font-size: 1rem;
                    color: #334155;
                    margin-bottom: 25px;
                }
                .popup-btn {
                    background-color: #0f172a;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: 0.2s;
                }
                .popup-btn:hover { background-color: #1e293b; }

                /* Formulaire création */
                .create-container {
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    font-family: 'Georgia', serif;
                    background: #f5f4f2;
                }
                .back-btn {
                    background-color: #334155;
                    color: white;
                    border: none;
                    padding: 10px 18px;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-bottom: 25px;
                    transition: 0.2s;
                }
                .back-btn:hover { background-color: #1e293b; }
                .create-title {
                    font-size: 2rem;
                    color: #0f172a;
                    margin-bottom: 25px;
                }
                .create-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .form-group label { font-weight: bold; color: #1e293b; margin-bottom: 6px; display: block; }
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid #cbd5e1;
                    font-size: 1rem;
                    font-family: 'Georgia', serif;
                }
                .form-group textarea { min-height: 200px; resize: vertical; }
                .submit-btn {
                    background-color: #0f172a;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: 0.2s;
                }
                .submit-btn:hover { background-color: #1e293b; }
                .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
            `}</style>
        </>
    );
}

export default Create;
