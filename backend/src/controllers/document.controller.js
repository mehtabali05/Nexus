import Document from "../models/Document.model.js";
import Meeting from "../models/Meeting.model.js";

// Upload document
export const uploadDocument = async (req, res, next) => {
  try {
    const { meetingId } = req.body;

    const meeting = await Meeting.findById(meetingId);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    // Only meeting participants
    const isAllowed =
      meeting.createdBy.toString() === req.user._id.toString() ||
      meeting.withUser.toString() === req.user._id.toString();

    if (!isAllowed) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const document = await Document.create({
      meeting: meetingId,
      uploadedBy: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path
    });

    res.status(201).json(document);
  } catch (error) {
    next(error);
  }
};

// Sign document (mock)
export const signDocument = async (req, res, next) => {
  try {
    const { signatureImage } = req.body;

    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    document.isSigned = true;
    document.signatureImage = signatureImage;

    await document.save();

    res.json({
      message: "Document signed",
      document
    });
  } catch (error) {
    next(error);
  }
};
