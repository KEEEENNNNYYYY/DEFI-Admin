import express from "express";
import cors from "cors";
import fs from "fs-extra";

const app = express();
const PORT = 5000;
const DATA_FILE = "./data.json";

app.use(cors());
app.use(express.json());

// 🔹 Lire le fichier JSON
const readData = async () => {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
};

// 🔹 Écrire dans le fichier JSON
const writeData = async (data) => {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

//  READ (GET) — Récupérer tous les éléments
app.get("/api/items", async (req, res) => {
    const data = await readData();
    res.json(data);
});

//  READ ONE (GET) — Récupérer un élément par ID
app.get("/api/items/:id", async (req, res) => {
    const data = await readData();
    const item = data.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Élément non trouvé" });
    res.json(item);
});

//  CREATE (POST) — Ajouter un nouvel élément
app.post("/api/items", async (req, res) => {
    const data = await readData();
    const newItem = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        ...req.body,
    };
    data.push(newItem);
    await writeData(data);
    res.status(201).json(newItem);
});

//  UPDATE (PUT) — Modifier un élément
app.put("/api/items/:id", async (req, res) => {
    const data = await readData();
    const index = data.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Élément non trouvé" });

    data[index] = { ...data[index], ...req.body };
    await writeData(data);
    res.json(data[index]);
});

//  DELETE (DELETE) — Supprimer un élément
app.delete("/api/items/:id", async (req, res) => {
    const data = await readData();
    const filtered = data.filter(i => i.id !== parseInt(req.params.id));
    if (filtered.length === data.length)
        return res.status(404).json({ message: "Élément non trouvé" });

    await writeData(filtered);
    res.json({ message: "Élément supprimé" });
});
// GET /api/items?search=mot
app.get("/api/items", async (req, res) => {
    const data = await readData();
    const { search } = req.query;

    if (search) {
        const filtered = data.filter(item =>
            Object.values(item).some(
                value =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(search.toLowerCase())
            )
        );
        return res.json(filtered);
    }

    res.json(data);
});

// 🚀 Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
