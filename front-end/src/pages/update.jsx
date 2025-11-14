import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UpdatePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", contenu: "" });

    // Charger l'élément
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/items/${id}`)
            .then((res) => setForm(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    // Gestion des champs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Envoi de la modification
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`${import.meta.env.VITE_API_URL}/api/items/${id}`, form)
            .then(() => {
                alert("Élément mis à jour !");
                navigate("/");
            })
            .catch((err) => console.error("Erreur :", err));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Modifier l’élément #{id}</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Nom : </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={{ padding: "6px", borderRadius: "4px", width: "300px" }}
                    />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label>Contenu : </label>
                    <textarea
                        name="contenu"
                        value={form.contenu}
                        onChange={handleChange}
                        required
                        rows={10}
                        style={{
                            width: "100%",
                            minWidth: "300px",
                            padding: "6px",
                            borderRadius: "4px",
                            resize: "vertical",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "14px",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: "#2ecc71",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    Enregistrer
                </button>
            </form>
        </div>
    );
}

export default UpdatePage;
