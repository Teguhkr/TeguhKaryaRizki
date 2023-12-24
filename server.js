import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/ideas', async (req, res) => {
    const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
    const { page, size, append, sort } = req.query;

    const queryParams = new URLSearchParams({
        'page[number]': page || 1,
        'page[size]': size || 10,
        append: append ? append.join(',') : '',
        sort: sort || 'published_at',
    });

    const urlWithParams = `${apiUrl}?${queryParams.toString()}`;

    try {
        const response = await fetch(urlWithParams);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
