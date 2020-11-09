const jwt = require('jsonwebtoken');
const { getInstance } = require('../shared/sharedFunctions')

module.exports = {
    verifyToken: async ( req, res, next ) => {
        try {
            // Gather the jwt access token from the request header
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]
            if (!token) throw Error("Token missing!")
            // Verifying token
            const user = jwt.verify(token, process.env.JWT_SECRET)
            if(!user || !user._id || !user.type) throw Error("Invalid token")
            const User = getInstance(user.type)
            if(!User) throw Error("No such user type")
            // Getting user from database
            const actualUser = await User.findById(user._id).select('_id name email').lean()
            if(!actualUser) throw Error("No user found")
            // pass on request further
            req.user = actualUser
            next()
        } catch (error) {
            console.log("Authentication Error: ",error);
            // Return unauthorized message to user
            return res.status(401).send({ message: error.message ? error.message : "Unauthorized access" })
        }

    },
    HasRole: (scope) => {
        return (req, res, next) => {
        if ( !scope.includes(req.user.__userType) ) return res.status(403).send({ message: "You are not authorized to access this resource" })
          else next();
        }
      }
}