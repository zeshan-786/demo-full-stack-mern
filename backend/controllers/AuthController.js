const { getInstance, getSchema, getUser } = require('../shared/sharedFunctions')
module.exports = {

  /**
   * AuthController.signin()
   */
  signin: async (req, res) => {
    try {
        // Checking required params
        if (!req.body.password || !req.body.email || !req.body.type) throw Error('Unable to login user, invalid params!')
        // Getting user by email
        const User = await getUser(req.body.type, { email: req.body.email })
        if (!User) throw Error('Incorrect email!')
        // Compairing password with user in database
        const passwordCheck = User.validatePassword(req.body.password)
        if(!passwordCheck) throw Error('Incorrect password!')
        // Generating JWT for user
        const returnData =  User.toAuthJSON()
        return res.status(201).json(returnData);
    } catch (error) {
        return res.status( error.status || 500 ).json({ 
            message: error.message ? error.message : 'Something went wrong'
        });
    }
    
  },

  /**
   * AuthController.signup()
   */
  signup: async (req, res) => {
    try {
        // Checking required params
        if (!req.body.password || !req.body.email || !req.body.type || !req.body.name ) throw Error('Unable to create user invalid params!')
        // Getting instance based in user type
        const Instance = getInstance(req.body.type)
        // Checking if user already exist with same email
        const dupCheck = await Instance.findOne({ email: req.body.email })
        if(dupCheck) throw Error('User already exists!')
        // Getting user document
        const User = getSchema(Instance, req.body)
        if (!User) throw Error('Unable to Create User of this type')
        // Setting user password
        User.setPassword(req.body.password)
        // Generating JWT for user to return in response
        const returnData =  User.toAuthJSON()
        // storing user in database
        const { errors } = await User.save()
        if (errors) throw Error('Error when storing User in database')
        return res.status(201).json(returnData);
    } catch (error) {
        return res.status( error.status || 500 ).json({ 
            message: error.message ? error.message : 'Something went wrong'
        });
    }
    
  },

   /**
   * AuthController.setPassword()
   */
  setPassword: async (req, res) => {
    try {
        // Checking required params
        if (!req.body.password || !req.body.newPassword ) throw Error('Unable to login user, invalid params!')
        // Getting user instance by type
        const User = getInstance(req.user.__userType )
        if (!User) throw Error('No user of this type found!')
        // Getting user from database
        const user = await User.findById(req.user._id)
        // Validating old password
        const passwordCheck = user.validatePassword(req.body.password)
        if(!passwordCheck) throw Error('Incorrect password!')
        // Setting new password for user
        user.setPassword(req.body.newPassword)
        // Generating JWT for user
        const returnData =  user.toAuthJSON()
        await user.save()
        return res.status(202).json(returnData);
    } catch (error) {
        return res.status( error.status || 500 ).json({ 
            message: error.message ? error.message : 'Something went wrong'
        });
    }
    
  },


};
