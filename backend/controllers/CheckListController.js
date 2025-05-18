const { createCheckList, findCheckListsByUserId, releaseChecklist, liberationChecklist } = require('../services/CheckListService');

const ChecklistController = {
  async create(req, res) {
    try {
      const { plates, headlights, brakes, tires } = req.body;
      const user_id = req.user.id; // ID do usuário logado

      const result = await createCheckList({
        user_id,
        plates,
        headlights,
        brakes,
        tires
      });

      res.status(201).json({
        success: true,
        data: {
          id: result.checklistId,
          user_id: user_id, // Confirmando o dono
          status: 'pending'
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar checklist'
      });
    }
  },

  async findByUserId(req, res) {
    try {
      const user_id = req.user.id; // Sempre pega do usuário autenticado

      const checklists = await findCheckListsByUserId(user_id);

      res.json({
        success: true,
        data: checklists,
        meta: {
          count: checklists.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar checklists'
      });
    }
  },

  async releaseChecklist(req, res) {
    try {
      const { checklist_id } = req.body;
      const user_id = req.user.id;

      const result = await liberationChecklist(checklist_id, user_id);

      res.json({
        success: true,
        data: result,
        meta: {
          count: result.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar checklists'
      });
    }
  }
};

module.exports = ChecklistController;