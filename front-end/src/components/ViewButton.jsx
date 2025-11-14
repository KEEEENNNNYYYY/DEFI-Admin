import { useNavigate } from "react-router-dom";

function ViewButton({ id }) {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/${id}`);
    };

    return (
        <button
            onClick={handleView}
            style={{
                backgroundColor: "#9b59b6",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                marginLeft: "10px",
            }}
        >
            Détails
        </button>
    );
}

export default ViewButton;
