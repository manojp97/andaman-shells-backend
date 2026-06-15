const contactService = require("./contact.service");

// CREATE
exports.createContact = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
exports.getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();

    res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
exports.deleteContact = async (req, res) => {
  try {
    await contactService.deleteContact(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};