import Certificates from "../models/Certificates.js";



// Add a new certificate
export const addCertificate = async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const image = req.file?.filename;

    if (!image) return res.status(400).json({ error: "Image is required" });

    // Logged-in user info from frontend
    const memberCode = req.body.memberCode;
    const memberName = req.body.memberName;
    const communityName = req.body.communityName;
    const communityId = req.body.communityId;

    const newCertificate = new Certificates({
      name,
      title,
      description,
      image,
      memberCode,
      memberName,
      communityName,
      communityId,
    });

    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all certificates
export const getCertificate = async (req, res) => {
  try {
    const { memberCode, memberName, communityName } = req.query;
    const filter = {};
    if (memberCode) filter.memberCode = memberCode;
    if (memberName) filter.memberName = memberName;
    if (communityName) filter.communityName = communityName;

    const certificates = await Certificates.find(filter).sort({ createdAt: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Update a certificate
export const updateCertificate = async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const image = req.file?.filename;

    const updatedData = { name, title, description };
    if (image) updatedData.image = image;

    const updatedCertificate = await Certificates.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedCertificate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a certificate
export const deleteCertificate = async (req, res) => {
  try {
    await Certificates.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Certificate deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
