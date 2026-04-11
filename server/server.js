const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const imageRoutes = require('./routes/image');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/chat', chatRoutes);
app.use('/api/image', imageRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'AI Nova Chat Server Running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
