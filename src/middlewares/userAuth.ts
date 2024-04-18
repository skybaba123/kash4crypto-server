import jwt from "jsonwebtoken";
import User from "@/models/user";

const userAuth = async (req: any, res: any, next: any) => {
  try {
    if (req.header("Authorization") === undefined)
      return res
        .status(400)
        .send({ error: "UnAuthorized Access: no authorization" });

    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(400).send({ error: "UnAuthorized Access" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRETE) as {
      _id: string;
    };

    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(404).send({ error: "No User Found" });
    }

    // if (user.sessionToken !== token) {
    //   return res
    //     .status(400)
    //     .send({ error: "Invalid Token, you need to Relogin" });
    // }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default userAuth;
