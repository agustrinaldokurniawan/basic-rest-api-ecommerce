const Address = require("../models/address");
const User = require("../models/user");

class AddressController {
  static async addAddress(req, res) {
    try {
      const {
        nomor,
        rt,
        rw,
        lengkap,
        kecamatan,
        kelurahan,
        kota,
        provinsi,
        negara,
        owner,
      } = await req.body;

      const newAddress = await new Address({
        nomor,
        rt,
        rw,
        lengkap,
        kecamatan,
        kelurahan,
        kota,
        provinsi,
        negara,
        owner,
      });

      await newAddress.save();

      const user = await User.findById(owner);

      await user.alamat.push(newAddress._id);
      await user.save();

      const afterUser = await User.findById(owner).populate("alamat");

      return res.json({ user: afterUser });
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  }

  static async removeAddress(req, res) {
    try {
      const { locationId } = req.body;

      const address = await Address.findById(locationId);

      const user = await User.findById(address.owner);
      await user.alamat.pull(locationId);
      await user.save();

      await Address.deleteOne({ _id: locationId });

      return res.json({
        message: "address removed",
      });
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  }
}

module.exports = AddressController;
