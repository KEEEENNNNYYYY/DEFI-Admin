import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/ComponentsBar";

function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/items/${id}`)
            .then((res) => setItem(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!item) return <p style={{ textAlign: "center", marginTop: "50px" }}>Chargement...</p>;

    return (
        <div style={{ backgroundColor: "#fdfaf6", minHeight: "100vh", fontFamily: "'Georgia', serif", color: "#333" }}>
            <Navbar onLogout={() => { }} />

            <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", boxSizing: "border-box" }}>
                <h1 style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    marginBottom: "10px",
                    lineHeight: "1.3",
                    borderBottom: "2px solid #ccc",
                    paddingBottom: "10px"
                }}>
                    {item.name}
                </h1>

                <p style={{ fontSize: "0.9rem", color: "#888", marginBottom: "20px" }}>
                    Article #{item.id} - Publié le {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <div style={{
                    backgroundColor: "#fff",
                    padding: "25px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    lineHeight: "1.7",
                    textAlign: "justify",
                    width: "100%",
                    boxSizing: "border-box",  // important pour éviter le débordement
                    overflowWrap: "break-word"  // empêche le texte long de dépasser
                }}>
                    <p>{item.contenu}</p>
                </div>

                <div style={{ marginTop: "30px", textAlign: "center" }}>
                    <button
                        onClick={() => navigate("/")}
                        style={{
                            backgroundColor: "#0077cc",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "6px",
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "background 0.3s"
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#005fa3")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0077cc")}
                    >
                        ← Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Details;
