import axios from "axios";

function DeleteButton({ id, onDelete }) {
    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/items/${id}`);
            onDelete(id); // Appelle la fonction de suppression côté parent
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            alert("Erreur lors de la suppression");
        }
    };

    return (
        <button
            onClick={handleDelete}
            style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                marginLeft: "10px",
            }}
        >
            Supprimer
        </button>
    );
}

export default DeleteButton;
