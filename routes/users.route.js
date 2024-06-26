import { Router, json } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  try{
    const users = await prisma.user.findMany();
    res.status(200).json(users)
  }
  catch(err){
    res.status(500).json({success:false,message:err.message})
  }
});

router.get("/:id", async(req, res) => {
  const id = req.params.id
  try{
    const user = await prisma.user.findFirst({
      where: {id:id},
      select:{
        id:true,
        firstName:true,
        lastName:true,
        emailAddress:true,
        username:true
      }
    })
    if(!user){
      res.status(404).json({success:false,message:"User not found"})
    }
    else{
     res.status(200).json(user)
    }
  }
  catch(err){
    res.status(500).json({success:false,message:err.message})
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, username, password } = req.body;
    const newuser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        username,
        password,
      },
      select: {
        id:true,
        firstName: true,
        lastName: true,
        emailAddress: true,
        username: true,
      },
    });
    res.status(201).json(newuser);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.patch("/:id", async(req, res) => {
  const { firstName, lastName, emailAddress, username, password } = req.body;
  const id = req.params.id
  try{
    let updatedUser;
    if(firstName){
      updatedUser = await prisma.user.update({
        where: {id:id},
        data: {firstName:firstName}
      })
    }
    if(lastName){
      updatedUser = await prisma.user.update({
        where: {id:id},
        data: {lastName:lastName}
      })
    }
    if(emailAddress){
      updatedUser = await prisma.user.update({
        where: {id:id},
        data: {emailAddress:emailAddress}
      })
    }
    if(username){
      updatedUser = await prisma.user.update({
        where: {id:id},
        data: {username:username}
      })
    }
    if(password){
      updatedUser = await prisma.user.update({
        where: {id:id},
        data: {password:password}
      })
    }
    res.status(200).json(updatedUser)
  }
  catch{
    res.status(500).json({success:false,message:err.message})
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try{
    const deleteUser = await prisma.user.delete({
      where: {id:id},
        select:{
          firstName: true,
          lastName: true,
          emailAddress: true,
          username: true,
          id:true
        }
    })
    res.status(200).json(deleteUser)
  }
  catch(err){
    res.status(500).json({success:false, message:err.message})
  }
});

export default router;
