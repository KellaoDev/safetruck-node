<script setup>
import { ref, watch } from 'vue';
import useCheckList from '../composables/useCheckList';

const { approveMaintenance, loading } = useCheckList()

const error = ref(null)

const props = defineProps({
    checklist: Object
})
const emit = defineEmits(['close', 'updated'])

const form = ref({
    plates: '',
    headlights: false,
    brakes: false,
    tires: false
})

watch(
    () => props.checklist,
    (newVal) => {
        if (newVal) {
            form.value.plates = newVal.plates || ''
            form.value.headlights = newVal.headlights ?? false
            form.value.brakes = newVal.brakes ?? false
            form.value.tires = newVal.tires ?? false
        } else {
            form.value.plates = ''
            form.value.headlights = false
            form.value.brakes = false
            form.value.tires = false
        }
    },
    { immediate: true, deep: true }
)

const submit = async () => {
    error.value = null

    const response = await approveMaintenance(props.checklist.id, form.value)

    if (!response?.success) {
        error.value = response?.message || 'Erro desconhecido'
        return
    }
    emit('updated')
}

const close = () => {
    emit('close')
}
</script>

<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <h3>Editar e Aprovar Checklist</h3>
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label>Placas:</label>
                    <input v-model="form.plates" />
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" v-model="form.headlights" />
                        Faróis OK
                    </label>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" v-model="form.brakes" />
                        Freios OK
                    </label>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" v-model="form.tires" />
                        Pneus OK
                    </label>
                </div>
                <div class="buttons">
                    <button type="submit" :disabled="loading">
                        {{ loading ? 'Salvando...' : 'Salvar e Aprovar' }}
                    </button>
                    <button type="button" @click="close">Cancelar</button>
                </div>
                <div v-if="error" class="error">Erro: {{ error }}</div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Open Sans", sans-serif;
}

.modal-content {
    background: #e3e3e3;
    padding: 2rem;
    border-radius: 8px;
    width: 350px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    color: #c91804;
}

h3 {
    margin-bottom: 1rem;
    color: #c91804;
}

.form-group {
    margin-bottom: 1rem;
}

input[type="text"],
input[type="checkbox"] {
    margin-left: 0.5rem;
}

.buttons {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
}

button {
    padding: 10px 20px;
    background-color: #c91804;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.error {
    color: red;
    margin-top: 1rem;
}
</style>
