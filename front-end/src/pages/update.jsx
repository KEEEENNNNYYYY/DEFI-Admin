import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/ComponentsBar";
import logo from '/400_filter_nobg_67f7be5f53ddb.webp';

function UpdatePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", contenu: "" });

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/items/${id}`)
            .then((res) => setForm(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
    const handleCancel = () => {
        // Vérifie si le formulaire a été modifié
        const isModified = form.name !== "" || form.contenu !== "";
        if (isModified) {
            const confirmCancel = window.confirm(
                "Vous avez des modifications non enregistrées. Voulez-vous vraiment annuler ?"
            );
            if (!confirmCancel) return; // Ne rien faire si l'utilisateur annule
        }
        navigate("/");
    };

    return (
        <div style={{
            background: "linear-gradient(to bottom, #f9f7f1, #fff)",
            minHeight: "100vh",
            fontFamily: "Arial, sans-serif",
            color: "#2c3e50",
            transition: "all 0.3s ease"
        }}>
            <Navbar onLogout={() => { }} />

            <div style={{
                maxWidth: "700px",
                margin: "40px auto",
                background: "#fff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
            }}>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <img src={logo} alt="Logo" style={{ width: "120px", marginBottom: "10px" }} />
                    <h1 style={{ color: "#2ecc71", fontWeight: "bold" }}>Modifier l’élément #{id}</h1>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                        <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Nom :</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
                                transition: "all 0.3s ease"
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Contenu :</label>
                        <textarea
                            name="contenu"
                            value={form.contenu}
                            onChange={handleChange}
                            required
                            rows={10}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
                                fontFamily: "Arial, sans-serif",
                                fontSize: "14px",
                                transition: "all 0.3s ease"
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                backgroundColor: "#2ecc71",
                                color: "white",
                                border: "none",
                                padding: "12px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                boxShadow: "0 5px 15px rgba(46,204,113,0.4)",
                                transition: "all 0.2s ease"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            Enregistrer
                        </button>

                        <button
                            type="button" // Important, sinon le bouton déclenche le submit par défaut
                            onClick={handleCancel}
                            style={{
                                flex: 1,
                                backgroundColor: "#95a5a6",
                                color: "white",
                                border: "none",
                                padding: "12px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                boxShadow: "0 5px 15px rgba(149,165,166,0.4)",
                                transition: "all 0.2s ease"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            Annuler
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdatePage;
