import { useState } from "react";
import "../styles/Navbar.css";

function Navbar({ onLogout, search, setSearch }) {
    return (
        <nav className="navbar">
            {/* LOGO */}
            <div className="navbar-left">
                <img
                    src="/400_filter_nobg_67f7be5f53ddb.webp"
                    alt="Logo Défi Madagascar"
                    className="navbar-logo"
                />

                <h2 className="navbar-title">Admin</h2>
            </div>

            {/* BARRE DE RECHERCHE */}
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* DECONNEXION */}
            <button className="navbar-logout" onClick={onLogout}>
                Déconnexion
            </button>
        </nav>
    );
}

export default Navbar;
