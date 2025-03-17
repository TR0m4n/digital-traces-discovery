import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import pool from './config/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes pour les traces
app.get('/api/traces', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM traces ORDER BY created_at DESC LIMIT 10');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des traces' });
  }
});

app.post('/api/traces', async (req, res) => {
  try {
    const { app_name, os_name, os_version, app_version, file_path, description, user_id } = req.body;
    const id = uuidv4();
    
    await pool.query(
      'INSERT INTO traces (id, app_name, os_name, os_version, app_version, file_path, description, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, app_name, os_name, os_version, app_version, file_path, description, user_id]
    );
    
    res.status(201).json({ id, message: 'Trace ajoutée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la trace' });
  }
});

app.get('/api/traces/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM traces WHERE id = ?', [req.params.id]);
    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Trace non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la trace' });
  }
});

// Route pour la recherche
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    const [rows] = await pool.query(
      'SELECT * FROM traces WHERE app_name LIKE ? OR os_name LIKE ? OR file_path LIKE ?',
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la recherche' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
}); 