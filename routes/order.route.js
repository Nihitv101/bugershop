import express from 'express';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import { getAdminOrders, getMyOrders, getOrdersDetails, paymentVerification, placeOrder, placeOrderOnline, processOrder } from '../controllers/order.controller.js';


const router = express.Router();


router.post('/createorder', isAuthenticated ,placeOrder);  // COD

router.post('/createorderonline', isAuthenticated, placeOrderOnline);

router.post('/paymentverification', paymentVerification);


router.get('/myorders', isAuthenticated,getMyOrders )


router.get('/order/:id', isAuthenticated, getOrdersDetails)


// Add admin Middleware for only admin:
router.get('/admin/order', isAuthenticated, authorizeAdmin,  getAdminOrders);


router.get('/admin/order/:id', isAuthenticated, authorizeAdmin ,processOrder);




export default router;
