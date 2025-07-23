import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Auth middleware: No valid authorization header');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const token = authHeader.split(' ')[1];
    console.log('Auth middleware: Token received:', token ? 'Yes' : 'No');
    
    if (!token) {
      console.log('Auth middleware: Token is empty');
      return res.status(401).json({ message: 'Token is missing' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Auth middleware: Token decoded successfully, userId:', decoded.userId);
      
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
        console.log('Auth middleware: User not found for userId:', decoded.userId);
        return res.status(401).json({ message: 'User not found' });
      }
      
      req.user = user;
      console.log('Auth middleware: User authenticated successfully:', user.email);
      next();
    } catch (jwtError) {
      console.log('Auth middleware: JWT verification failed:', jwtError.message);
      return res.status(401).json({ message: 'Token is not valid' });
    }
  } catch (error) {
    console.error('Auth middleware: Unexpected error:', error);
    return res.status(500).json({ message: 'Authentication error' });
  }
};

export default authMiddleware; 