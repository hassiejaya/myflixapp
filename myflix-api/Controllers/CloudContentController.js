const CloudContent = require("../Models/CloudContentModel");

module.exports.getContentUrl = async (req, res) => {
    try { 
     //console.log("trying at cloud content controller");
      const { id } = req.params;
      const content = await await CloudContent.findOne({ id });
      if (content) {
        return res.json({ msg: "success", source: content.url });
      } else return res.json({ msg: "Content with given id not found." });
    } catch (error) {
      return res.json({ msg: "Error fetching content." });
    }
  };