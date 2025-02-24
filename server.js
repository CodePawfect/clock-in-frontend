import jsonServer from 'json-server';
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use(cookieParser());

// Custom login endpoint
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const users = router.db.get('users').value();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Exclude password from response
        const {password: _password, ...userWithoutPassword} = user;

        // Simulate generation of tokens
        const fakeToken = "fake-jwt-token";
        const fakeRefreshToken = "fake-refresh-token";

        // Set HTTP-only cookies (cannot be accessed via JavaScript)
        res.cookie('authToken', fakeToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only over HTTPS in production
            sameSite: 'lax'
        });
        res.cookie('refreshToken', fakeRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        res.status(200).json({
            ...userWithoutPassword,
            role: user.role
        });
    } else {
        res.status(401).json({error: 'Invalid credentials'});
    }
});

// Session endpoint to check if user is authenticated
app.get('/session', (req, res) => {
    const token = req.cookies.authToken;
    if (token) {
        // In a real app, verify the token and get user data accordingly.
        // Here, we simply return the first user from our db as a mock.
        const users = router.db.get('users').value();
        if (users && users.length > 0) {
            const {password, ...userWithoutPassword} = users[0];
            return res.status(200).json(userWithoutPassword);
        }
    }
    res.status(401).json({error: 'Not authenticated'});
});

// Logout endpoint to clear cookies
app.post('/logout', (req, res) => {
    res.status(200).json({message: 'Logged out successfully'});
});

// Use default router for any other routes
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
