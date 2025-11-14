import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
    const [name, setName] = useState("");
    const [contenu, setContenu] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/items`, {
                name,
                contenu
            });

            alert("Élément créé avec succès !");
            navigate("/"); // retourne à la page Home
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création de l'élément.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
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

                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <label><strong>Contenu :</strong></label>
                    <textarea
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                        placeholder="Écrivez le contenu ici..."
                        style={{
                            width: "100%",
                            height: "400px",        // hauteur comme le details
                            padding: "10px",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontFamily: "Arial, sans-serif",
                            resize: "vertical",     // peut redimensionner verticalement
                            overflowY: "auto",      // scroll vertical si nécessaire
                            whiteSpace: "pre-line"  // garde les sauts de ligne
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: "#0f172a",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    Créer
                </button>
            </form>
        </div>
    );
}

export default Create;
