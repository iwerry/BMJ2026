import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Directory to store preferences
const CRONOGRAMA_DIR = path.join(__dirname, 'cronograma');
const PREFERENCES_FILE = path.join(CRONOGRAMA_DIR, 'preferenciasusuarios.json');

// Ensure directory and file exist
if (!fs.existsSync(CRONOGRAMA_DIR)) {
  fs.mkdirSync(CRONOGRAMA_DIR, { recursive: true });
}
if (!fs.existsSync(PREFERENCES_FILE)) {
  fs.writeFileSync(PREFERENCES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

app.use(express.json());

// Serve static files from Vite build folder
app.use(express.static(path.join(__dirname, 'dist')));

// Helper to read users
function readUsers() {
  try {
    const data = fs.readFileSync(PREFERENCES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper to write users
function writeUsers(users: any[]) {
  fs.writeFileSync(PREFERENCES_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

// API Routes
app.post('/api/users/sync', (req, res) => {
  const { nome, telefone, email, senha, favoriteIds } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email é obrigatório.' });
  }

  const users = readUsers();
  const idx = users.findIndex((u: any) => u.email === email);
  const now = new Date().toISOString();

  if (idx >= 0) {
    // Update existing user
    users[idx] = {
      ...users[idx],
      nome: nome || users[idx].nome,
      telefone: telefone || users[idx].telefone,
      senha: senha || users[idx].senha,
      favoriteIds: favoriteIds !== undefined ? favoriteIds : users[idx].favoriteIds,
      updatedAt: now
    };
  } else {
    // Create new user
    users.push({
      nome,
      telefone,
      email,
      senha,
      favoriteIds: favoriteIds || [],
      createdAt: now,
      updatedAt: now
    });
  }

  writeUsers(users);
  res.json({ success: true, user: users.find((u: any) => u.email === email) });
});

app.post('/api/users/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  const users = readUsers();
  const user = users.find((u: any) => u.email === email && u.senha === senha);
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  res.json({ success: true, user });
});

// Fallback to React SPA (index.html) for routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
