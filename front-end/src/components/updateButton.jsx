import { useNavigate } from "react-router-dom";

function EditButton({ id }) {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/update/${id}`);
    };

    return (
        <button
            onClick={handleEdit}
            style={{
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                marginLeft: "10px",
            }}
        >
            Modifier
        </button>
    );
}

export default EditButton;
