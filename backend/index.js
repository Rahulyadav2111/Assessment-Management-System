const express = require('express');
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/auth', authRoutes); 
app.use('/api/reports', reportRoutes); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});