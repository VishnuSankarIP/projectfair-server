const express=require('express')
const usercontroller=require('../Routes/usercontroller')
const projectController=require('../projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

const  router=new express.Router()

// Register
router.post('/register',usercontroller.register)

// login
router.post('/login',usercontroller.login)

// add project
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addproject)

// get all project
router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)

// get userprojects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)

// get home projects

router.get('/home-projects',projectController.getHomeProjects)

// edit project

router.put('/edit-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

// remove project

router.delete('/remove-project/:pid',jwtMiddleware,projectController.removeProject)

// edituser
router.put('/edit-user',jwtMiddleware,multerConfig.single('profileImage'),usercontroller.editUser)


// export router
module.exports=router