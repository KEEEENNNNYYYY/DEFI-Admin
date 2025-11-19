import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../components/deleteButton";
import EditButton from "../components/updateButton";
import ViewButton from "../components/ViewButton";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home() {
    const [data, setData] = useState([]); // Tous les éléments
    const [filteredData, setFilteredData] = useState([]); // Éléments filtrés pour la recherche
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    //  Charger tous les éléments depuis le backend au chargement de la page
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`);
                setData(res.data);
                setFilteredData(res.data); // Initialement tous les éléments
            } catch (err) {
                console.error(err);
            }
        };

        fetchItems();
    }, []);

    // ⚡ Filtrage live dès que `search` change
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

    //  Supprimer un élément localement
    const handleDelete = (id) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        setFilteredData((prevData) => prevData.filter((item) => item.id !== id));
    };

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

                            {/* Affichage de l'image si elle existe */}
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
