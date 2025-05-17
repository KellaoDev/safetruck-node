const { createCheckList } = require('../services/CheckListService');

const checklistController = {
  async create(req, res) {
    const user_id = req.user.id; // Assume que está autenticado via middleware
    const { plates, headlights, brakes, tires } = req.body;

    try {
      const result = await createCheckList({
        user_id,
        plates,
        headlights,
        brakes,
        tires
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  },
};

module.exports = checklistController;
