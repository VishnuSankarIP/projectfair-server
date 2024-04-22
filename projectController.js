const projects = require("./Routes/Models/projectModel");

// add project
exports.addproject = async (req, res) => {
    console.log("Inside add project request!!");
    console.log(req.payload);
    console.log(req.body);
    // to get uploaded file
    console.log(req.file);
    const { title, language, overview, github, website } = req.body
    const userId = req.payload
    const projectImage = req.file.filename
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project already available in the system,Kindky upload another")
        }
        else {
            const newproject = new projects({
                title, language, overview, github, website, projectImage, userId
            })
            await newproject.save()
            res.status(200).json(newproject)
        }
    }
    catch (err) {
        res.status(401).json(err)
    }


}


// get all projects
exports.getAllProjects = async (req, res) => {
    const searchKey=req.query.search
    console.log(searchKey);
    const query={
        language:{
            $regex: searchKey, $options: 'i'
        }
    }
    try {

        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// get userprojects
exports.getUserProjects = async (req, res) => {
    const userId=req.payload
    try {


        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }
    catch (err) {
        res.status(401).json(err)
    }
}


// get home projects

exports.getHomeProjects = async (req, res) => {
    try {

        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }
    catch (err) {
        res.status(401).json(err)
    }
}


// edit project
exports.editProject=async(req,res)=>{
    console.log("Inside edit project");
    const {pid}=req.params
    const userId=req.payload
    const {title, language, overview, github, website, projectImage}=req.body
    const uploadImage=req.file?req.file.filename:projectImage


    try{
        const updatedProject=await projects.findByIdAndUpdate({_id:pid},{title, language, overview, github, website,projectImage:uploadImage,userId},{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)

    }
    catch(err)
    {
        res.status(401).json(err)
    }
}

// remove
exports.removeProject=async(req,res)=>{
    console.log("Inside remove projects");
    const {pid}=req.params
    try{
        const projectDetails=await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)

    }catch (err) {
        res.status(401).json(err)
    }
}
