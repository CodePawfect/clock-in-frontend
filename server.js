import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(jsonServer.bodyParser);

// Custom middleware for handling POST /login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Retrieve users from the database
    const users = router.db.get('users').value();

    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Exclude password from the response
        const { password, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Use default router
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
