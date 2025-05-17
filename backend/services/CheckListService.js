const Checklist = require('../models/CheckListModel');

async function createCheckList({ user_id, plates, headlights, brakes, tires}) {
    const date_checklist = new Date().toISOString().split('T')[0]

    const checklistId = await Checklist.create({ user_id, plates, headlights, brakes, tires, date_checklist})
    return { message: 'CheckList criado com sucesso', checklistId };
}

module.exports = { createCheckList };