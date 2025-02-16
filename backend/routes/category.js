import express from 'express';
import { addCategory, updateCategory, deleteCategory, getAllCategory} from '../controllers/category.js'

const router = express.Router();

router.post('/add', addCategory);
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/', getAllCategory);

export default router;