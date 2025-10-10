import express from 'express';
import Plant from '../models/Plant.js';

const router = express.Router();

// GET: lista todas
router.get('/', async (_req, res) => {
  const items = await Plant.find().sort({ createdAt: -1 });
  res.json(items);
});

// SEED: carga datos demo (llámalo 1 vez con POST)
router.post('/seed', async (_req, res) => {
  await Plant.deleteMany({});
  const demo = await Plant.insertMany([
    {
      name: 'Monstera deliciosa',
      potStyle: 'Macetero rostro blanco',
      category: 'interior',
      size: 'normal',
      price: 29990,
      imageUrl: '/assets/monstera_tag.png',
      description: 'Icono tropical; hojas troqueladas.'
    },
    {
      name: 'Ficus lyrata',
      potStyle: 'Rostro cilíndrico blanco',
      category: 'interior',
      size: 'normal',
      price: 32900,
      imageUrl: '/assets/ficus_tag.png',
      description: 'Hoja grande; look escultórico.'
    }
  ]);
  res.status(201).json(demo);
});

export default router;
