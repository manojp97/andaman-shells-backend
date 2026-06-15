const ContactInfo = require("./contactInfo.model");

class ContactInfoRepository {
  async get() {
    let data = await ContactInfo.findOne();

    if (!data) {
      data = await ContactInfo.create({});
    }

    return data;
  }

  async update(payload) {
    let data = await ContactInfo.findOne();

    if (!data) {
      return await ContactInfo.create(payload);
    }

    return await ContactInfo.findByIdAndUpdate(
      data._id,
      payload,
      {
        new: true,
      }
    );
  }
}

module.exports = new ContactInfoRepository();