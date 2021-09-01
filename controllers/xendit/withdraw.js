const User = require("../../models/user")
class WithdrawController {
  static async request(req, res) {
    try {
        const resDirburse;//disburseschema
        const {userId, nominal} = await req.body

        const user = User.exists({_id: userId}).lean()

        if(!user){
            throw new Error("User not found")
        }

        //save to db withdraw
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  //approve
  //reject
}
