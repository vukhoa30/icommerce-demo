import express from 'express';

const router = express.Router()

router.get('/', (req, res) => {
  res.end('Hello, is it me you are looking for')
})

export default router;
