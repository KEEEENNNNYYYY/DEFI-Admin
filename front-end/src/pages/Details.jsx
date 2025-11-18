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

    if (!item) return <p>Chargement...</p>;

    return (
        <div>
            <Navbar onLogout={() => { }} />
            <div style={{ padding: "20px" }}>
                <h1>Détails de l’élément #{item.id}</h1>

                <div
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "20px",
                        maxWidth: "600px",
                    }}
                >
                    <p>
                        <strong>ID :</strong> {item.id}
                    </p>
                    <p>
                        <strong>Nom :</strong> {item.name}
                    </p>
                    <div style={{ marginTop: "10px" }}>
                        <strong>Contenu :</strong>
                        <textarea
                            value={item.contenu}
                            readOnly
                            rows={10}
                            style={{
                                width: "100%",
                                minWidth: "300px",
                                padding: "6px",
                                borderRadius: "4px",
                                fontFamily: "Arial, sans-serif",
                                fontSize: "14px",
                                resize: "vertical",
                            }}
                        />
                    </div>
                </div>

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
            </div>
        </div>
    );
}

export default Details;
