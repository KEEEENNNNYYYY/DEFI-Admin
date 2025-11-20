import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../components/deleteButton";
import EditButton from "../components/updateButton";
import ViewButton from "../components/ViewButton";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true); // ⬅ Nouveau
    const navigate = useNavigate();

    // Charger tous les éléments depuis le backend au chargement
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`);
                setData(res.data);
                setFilteredData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                // petit délai pour une transition propre
                setTimeout(() => setLoading(false), 800);
            }
        };

        fetchItems();
    }, []);

    // Filtrage live
    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = data.filter(item =>
            Object.values(item).some(
                value =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(lowerSearch)
            )
        );
        setFilteredData(filtered);
    }, [search, data]);

    // Suppression locale
    const handleDelete = (id) => {
        setData(prev => prev.filter(item => item.id !== id));
        setFilteredData(prev => prev.filter(item => item.id !== id));
    };

    // 🌟 LOADER PREMIUM
    if (loading)
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backdropFilter: "blur(4px)",
                    background: "rgba(255, 255, 255, 0.6)",
                }}
            >
                <div
                    style={{
                        width: "60px",
                        height: "60px",
                        border: "6px solid #ddd",
                        borderTop: "6px solid #0077cc",
                        borderRadius: "50%",
                        animation: "spin 0.9s linear infinite",
                    }}
                />

                <style>
                    {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    `}
                </style>
            </div>
        );

    return (
        <>
            <Navbar search={search} setSearch={setSearch} onLogout={() => { }} />

            <div className="home-container">
                <h1 className="title">Liste des éléments</h1>

                <button onClick={() => navigate("/create")} className="create-btn">
                    + Créer un nouvel élément
                </button>

                {filteredData.map((item) => (
                    <div key={item.id} className="item-card">
                        <div className="item-info">
                            <p><strong>ID :</strong> {item.id}</p>

                            {item.imageUrl && (
                                <div style={{ margin: "10px 0" }}>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        style={{ maxWidth: "200px", borderRadius: "6px" }}
                                    />
                                </div>
                            )}

                            <p><strong>Nom :</strong> {item.name}</p>

                            <div className="textarea-wrapper">
                                <strong>Contenu :</strong>
                                <textarea
                                    value={item.contenu}
                                    readOnly
                                    rows={4}
                                    className="content-textarea"
                                />
                            </div>
                        </div>

                        <div className="action-buttons">
                            <ViewButton id={item.id} />
                            <EditButton id={item.id} />
                            <DeleteButton id={item.id} onDelete={handleDelete} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
