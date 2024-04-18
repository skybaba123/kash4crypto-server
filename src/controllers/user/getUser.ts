const getUser = async (req: any, res: any) => {
  try {
    const user = req.user;
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default getUser;
