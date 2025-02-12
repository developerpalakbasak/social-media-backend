import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token;
    // console.log(token);
    

    if (!token) {
        return res.status(401).json({ message: "Not authorized, please login first" });
    }

    try {
        // Verify token and decode user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

export default protect;
