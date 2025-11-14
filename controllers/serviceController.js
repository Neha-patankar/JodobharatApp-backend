import Service from "../models/Service.js";

// Get all services
// ✅ Controller: getServices
export const getServices = async (req, res) => {
  try {
    const { memberCode, memberName, communityName } = req.query;

    // Filter according to logged-in member
    const filter = {};
    if (memberCode) filter.memberCode = memberCode;
    if (memberName) filter.memberName = memberName;
    if (communityName) filter.communityName = communityName;

    const services = await Service.find(filter);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Error fetching services" });
  }
};


// Add a new service
export const addService = async (req, res) => {
  try {
    const { name, description, memberCode, memberName, communityName, communityId } = req.body;
    const image = req.file?.filename;

    if (!image) return res.status(400).json({ error: "Image is required" });

    const newService = new Service({
      name,
      description,
      image,
      memberCode,
      memberName,
      communityName,
      communityId,
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file?.filename;

    const updatedData = { name, description };
    if (image) updatedData.image = image;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
