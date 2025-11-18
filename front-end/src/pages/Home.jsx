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
    const navigate = useNavigate();

    const [search, setSearch] = useState("");


    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/items`)
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (id) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
    };

    return (
        <>
            <Navbar
                search={search}
                setSearch={setSearch}
                onLogout={() => alert("Déconnecté !")}
            />
            <div className="home-container">
                <h1 className="title">Liste des éléments</h1>

                <button onClick={() => navigate("/create")} className="create-btn">
                    + Créer un nouvel élément
                </button>

                {data.map((item) => (
                    <div key={item.id} className="item-card">
                        <div className="item-info">
                            <p><strong>ID :</strong> {item.id}</p>
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
