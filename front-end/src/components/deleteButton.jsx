import { useState } from "react";
import axios from "axios";

function DeleteButton({ id, onDelete }) {
    const [loading, setLoading] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/items/${id}`);
            setTimeout(() => {
                setLoading(false);
                setSuccessPopup(true); // Affiche popup succès
                onDelete(id); // Supprime côté parent
            }, 1000); // petite attente pour effet visuel
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            setLoading(false);
            setErrorPopup(true); // Affiche popup erreur
        }
    };

    const closePopup = () => {
        setSuccessPopup(false);
        setErrorPopup(false);
    };

    return (
        <>
            <button
                onClick={handleDelete}
                style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginLeft: "10px",
                    transition: "0.2s",
                }}
                onMouseEnter={e => (e.target.style.backgroundColor = "#c0392b")}
                onMouseLeave={e => (e.target.style.backgroundColor = "#e74c3c")}
            >
                Supprimer
            </button>

            {/* Écran de chargement */}
            {loading && (
                <div style={{
                    position: "fixed", top: 0, left: 0,
                    width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex", justifyContent: "center", alignItems: "center",
                    zIndex: 9999,
                    fontFamily: "Georgia, serif",
                    color: "white",
                    flexDirection: "column"
                }}>
                    <div style={{
                        width: "50px", height: "50px",
                        border: "6px solid #fff",
                        borderTop: "6px solid transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                    }}></div>
                    <p style={{ marginTop: "15px" }}>Suppression en cours...</p>
                    <style>{`
                        @keyframes spin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}

            {/* Popup succès */}
            {successPopup && (
                <div style={{
                    position: "fixed", top: 0, left: 0,
                    width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex", justifyContent: "center", alignItems: "center",
                    zIndex: 9999
                }}>
                    <div style={{
                        background: "#fff",
                        padding: "30px 40px",
                        borderRadius: "20px",
                        boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                        textAlign: "center",
                        fontFamily: "Georgia, serif",
                        maxWidth: "350px",
                        width: "90%"
                    }}>
                        <h2 style={{ fontSize: "1.5rem", color: "#0f172a", marginBottom: "15px" }}>✅ Supprimé !</h2>
                        <p style={{ fontSize: "1rem", color: "#334155", marginBottom: "25px" }}>L'élément a été supprimé avec succès.</p>
                        <button onClick={closePopup} style={{
                            backgroundColor: "#0f172a",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            transition: "0.2s"
                        }} onMouseEnter={e => e.target.style.backgroundColor = "#1e293b"} onMouseLeave={e => e.target.style.backgroundColor = "#0f172a"}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {/* Popup erreur */}
            {errorPopup && (
                <div style={{
                    position: "fixed", top: 0, left: 0,
                    width: "100%", height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex", justifyContent: "center", alignItems: "center",
                    zIndex: 9999
                }}>
                    <div style={{
                        background: "#fff",
                        padding: "30px 40px",
                        borderRadius: "20px",
                        boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                        textAlign: "center",
                        fontFamily: "Georgia, serif",
                        maxWidth: "350px",
                        width: "90%"
                    }}>
                        <h2 style={{ fontSize: "1.5rem", color: "#0f172a", marginBottom: "15px" }}>⚠️ Erreur !</h2>
                        <p style={{ fontSize: "1rem", color: "#334155", marginBottom: "25px" }}>Impossible de supprimer l'élément.</p>
                        <button onClick={closePopup} style={{
                            backgroundColor: "#0f172a",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "1rem",
                            transition: "0.2s"
                        }} onMouseEnter={e => e.target.style.backgroundColor = "#1e293b"} onMouseLeave={e => e.target.style.backgroundColor = "#0f172a"}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default DeleteButton;
