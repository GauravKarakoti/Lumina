import express from 'express';
import cors from 'cors';
import "dotenv/config";
import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';
import adminRoutes from './routes/admin.js';
import { checkAdmin, checkAuth } from './middleware/checkAuth.js';
const app = express();
const port = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', checkAuth, checkAdmin, adminRoutes); // All admin routes are protected
app.use('/api', apiRoutes); // Public API routes
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map