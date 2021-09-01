class DirsbursementController {
  static async create(req, res) {
    try {
      const { userId, amount } = await req.body;
    } catch (error) {
      return res.stats(500).json(error.message);
    }
  }
}
