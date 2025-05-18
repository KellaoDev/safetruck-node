const Checklist = require('../models/CheckListModel');

async function createCheckList({ user_id, plates, headlights, brakes, tires, status = 'pending' }) {
    try {
        const date_checklist = new Date().toISOString().split('T')[0];

        const checklistId = await Checklist.create({
            user_id,
            plates,
            headlights,
            brakes,
            tires,
            date_checklist,
            status
        });

        return {
            success: true,
            message: 'CheckList criado com sucesso',
            data: { checklistId }
        };

    } catch (error) {
        console.error('Erro em createCheckList:', error);
        return {
            success: false,
            message: 'Falha ao criar Checklist',
            error: error.message
        };
    }
}

async function findCheckListsByUserId(user_id) {
    try {
        const checklists = await Checklist.findByUserId(user_id);

        return {
            success: true,
            message: checklists.length > 0
                ? 'Checklists encontrados'
                : 'Nenhum checklist encontrado para este usuário',
            data: checklists,
            count: checklists.length,
            metadata: {
                pending: checklists.filter(c => c.status === 'pending').length,
                approved: checklists.filter(c => c.status === 'approved').length,
                rejected: checklists.filter(c => c.status === 'rejected').length
            }
        };

    } catch (error) {
        console.error('Erro em findCheckListsByUserId:', error);
        return {
            success: false,
            message: 'Falha ao buscar checklists',
            error: error.message
        };
    }
}

async function liberationChecklist(checklist_id, user_id) {
    try {
        const date_liberation = new Date().toISOString().split('T')[0];
        const result = await Checklist.updateStatus(checklist_id, user_id, date_liberation);

        // 2. Se chegou aqui, a operação foi bem-sucedida
        return {
            success: true,
            message: 'Checklist liberado com sucesso',
            data: {
                checklist_id: result.checklist_id,
                control_id: result.control_id,
                date_liberation: result.date_liberation,
                status: 'released',
                released_by: user_id
            }
        };
    } catch (error) {
        console.error('Erro no ChecklistService.releaseChecklist:', {
            error: error.message,
            checklist_id,
            user_id,
            stack: error.stack
        });
        return {
            success: false,
            type: error.type || 'INTERNAL_ERROR',
            message: error.message || 'Erro ao liberar checklist',
            statusCode: error.statusCode || 500
        };
    }
}

module.exports = {
    createCheckList,
    findCheckListsByUserId,
    liberationChecklist
};