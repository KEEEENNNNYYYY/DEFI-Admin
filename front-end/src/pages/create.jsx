import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";

function Create() {
    const [name, setName] = useState("");
    const [contenu, setContenu] = useState("");
    const [uploaded, setUploaded] = useState({ imageUrl: "", publicId: "" }); // <-- State pour l'image
    const [loading, setLoading] = useState(false);

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

            setTimeout(() => {
                alert("Élément créé avec succès !");
                navigate("/");
            }, 3000);

        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création.");
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999,
                    color: "white",
                    fontSize: "24px",
                    flexDirection: "column"
                }}>
                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            border: "6px solid #fff",
                            borderTop: "6px solid transparent",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite"
                        }}
                    ></div>
                    <p style={{ marginTop: "20px" }}>Création en cours...</p>
                    <style>
                        {`
                        @keyframes spin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        `}
                    </style>
                </div>
            )}

            <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
                <button
                    onClick={() => navigate("/")}
                    style={{
                        backgroundColor: "#95a5a6",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        marginTop: "20px",
                        cursor: "pointer",
                    }}
                >
                    ← Retour
                </button>

                <h1>Créer un nouvel élément</h1>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                    <div>
                        <label><strong>Nom :</strong></label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ width: "100%", padding: "6px", borderRadius: "4px", fontSize: "14px" }}
                        />
                    </div>

                    <div>
                        <label><strong>Image :</strong></label>
                        <UploadImage onUpload={setUploaded} /> {/* <-- Ici */}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label><strong>Contenu :</strong></label>
                        <textarea
                            value={contenu}
                            onChange={(e) => setContenu(e.target.value)}
                            style={{
                                width: "100%",
                                height: "400px",
                                padding: "10px",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontFamily: "Arial, sans-serif",
                                resize: "vertical"
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: "#0f172a",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "16px",
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        Créer
                    </button>
                </form>
            </div>
        </>
    );
}

export default Create;
