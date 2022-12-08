import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prismaInit';
import { hashedPassword } from '../helpers/bcryptConfig';
import {SignUpUser} from '../@types'
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userName, password, confirmPassword } = req.body as SignUpUser

    // check if password matches
    if (!password.match(confirmPassword))
      return res.json({ message: 'Passwords do not match' });
   
    const userSignup = await prisma .user.create({  
        data:{
            userName,
            password: await hashedPassword(password)
        }
    })
    res.status(200).json({userId: userSignup.id, success:true})
  } catch (error) {
    next(error);
  }
};
