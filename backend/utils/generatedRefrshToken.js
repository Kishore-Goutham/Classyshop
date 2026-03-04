import jwt from 'jsonwebtoken'
import UserModel from '../Model/user.model.js'

const generatedRefreshToken = async (userId)=>{
      const token = await jwt.sign(
             {id:userId},
             process.env.SECRET_KEY_REFRESH_TOKEN,
             {expiresIn:'7d'}
          )
     const updateRefreshToken = await UserModel.updateOne({_id:userId},{refresh_token:token}) //no $set is needed here in updateone by default mongoose assigns it.
     return token    
}

export default generatedRefreshToken