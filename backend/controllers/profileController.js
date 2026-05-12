import Staff from "../models/Staff.js";



export const getProfile = async(req, res) => {
     try {
        
const session = req.session;
const staff = await Staff.findOne({userId: session.userId})

  if(!staff){
    return res.json({
        firstName: "Admin",
        lastName: "",
        email: session.email,
    })
  }

   return res.json(staff);


     } catch (error) {
        return res.status(500).json({error: "Failed to fetch profile"});
     }
}


export const updateProfile = async(req, res) => {
   try {

    const session = req.session;
    const staff = await Staff.findOne({userId: session.userId})
    if(!staff) return res.status(404).json({error: "Staff not found"});

    if(staff.isDeleted){
        return res.status(403).json({error: "Your account is deactivated. You cannot update your profile"})
    }
     
    await staff.findByIdAndUpdate(staff._id, {bio: req.body.bio})

    return res.json({success: true});

   } catch (error) {
    return res.status(500).json({error: "Failed to Update profile"});
   }   
}