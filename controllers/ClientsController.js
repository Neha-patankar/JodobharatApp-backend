import Clients from "../models/client.js";

// Get all clients
export const getClients = async (req, res) => {
  try {
    const filter = {};
    if (req.query.memberCode) filter.memberCode = req.query.memberCode;
    if (req.query.memberName) filter.memberName = req.query.memberName;
    if (req.query.communityName) filter.communityName = req.query.communityName;

    const clients = await Clients.find(filter);
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Add new client
export const addClient = async (req, res) => {
  try {
    const { name, title, description, memberCode, memberName, communityName, communityId } = req.body;
    const logo = req.file?.filename;

    if (!logo) return res.status(400).json({ error: "Logo is required" });

    const newClient = new Clients({
      name,
      title,
      description,
      logo,
      memberCode,
      memberName,
      communityName,
      communityId
    });

    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update client
export const updateClient = async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const logo = req.file?.filename;

    const updatedData = { name, title, description };
    if (logo) updatedData.logo = logo;

    const updatedClient = await Clients.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete client
export const deleteClient = async (req, res) => {
  try {
    await Clients.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
