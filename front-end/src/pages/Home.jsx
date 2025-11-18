import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../components/deleteButton";
import EditButton from "../components/updateButton";
import ViewButton from "../components/ViewButton";

function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

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
        <div style={{ padding: "20px" }}>
            <h1>Liste des éléments</h1>

            <button
                onClick={() => navigate("/create")}
                style={{
                    backgroundColor: "#0f172a",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginBottom: "20px"
                }}
            >
                + Créer un nouvel élément
            </button>

            {data.map((item) => (
                <div
                    key={item.id}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "10px",
                    }}
                >
                    <div style={{ flex: 1 }}>
                        <p style={{ margin: "0 0 5px 0" }}>
                            <strong>ID:</strong> {item.id}
                        </p>
                        <p style={{ margin: "0 0 5px 0" }}>
                            <strong>Nom:</strong> {item.name}
                        </p>
                        <div>
                            <strong>Contenu:</strong>
                            <textarea
                                value={item.contenu}
                                readOnly
                                rows={5}
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

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <ViewButton id={item.id} />
                        <EditButton id={item.id} />
                        <DeleteButton id={item.id} onDelete={handleDelete} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
