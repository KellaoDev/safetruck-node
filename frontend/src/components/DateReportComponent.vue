<script>
import api from '../api/CheckListApi';
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      loading: false,
      error: ''
    };
  },
  methods: {
    async generateReport() {
      this.loading = true
      this.error = ''

      try {
        const response = await api.getDateReport(this.startDate, this.endDate)

        if (response.data.success && response.data.data.length > 0) {
          this.exportToExcel(response.data.data)
        } else {
          this.error = 'Nenhum dado encontrado para o período selecionado'
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao gerar relatório'
      } finally {
        this.loading = false
      }
    },

    exportToExcel(data) {
      const excelData = data.map(item => ({
        'Placa': item.Placa,
        'Motorista': item.Motorista,
        'Data do Checklist': this.formatExcelDate(item['Data do Checklist']),
        'Data de Liberação': this.formatExcelDate(item['Data de Liberação']),
        'Data de Retorno': this.formatExcelDate(item['Data de Retorno'])
      }))

      const worksheet = XLSX.utils.json_to_sheet(excelData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Checklists")

      const fileName = `relatorio_checklists_${this.startDate}_a_${this.endDate}.xlsx`;

      XLSX.writeFile(workbook, fileName)
    },

    formatExcelDate(dateString) {
      if (!dateString) return '-'

      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR')
    }
  },
  watch: {
    startDate(newVal) {
      if (newVal && this.endDate && new Date(newVal) > new Date(this.endDate)) {
        this.endDate = newVal
      }
    }
  }
}
</script>

<template>
  <div class="report-container">
    <h2>Gerar Relatório de Checklists</h2>

    <div class="date-filters">
      <div class="form-group">
        <label for="startDate">Data Inicial:</label>
        <input type="date" id="startDate" v-model="startDate" class="form-control" />
      </div>

      <div class="form-group">
        <label for="endDate">Data Final:</label>
        <input type="date" id="endDate" v-model="endDate" class="form-control" :min="startDate" />
      </div>

      <button @click="generateReport" class="btn btn-primary" :disabled="!startDate || !endDate || loading">
        <span v-if="!loading">Gerar Relatório XLSX</span>
        <span v-else>Gerando...</span>
      </button>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
</template>

<style scoped>
.report-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.date-filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: flex-end;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

label {
  margin-bottom: 5px;
  font-weight: 500;
}

input[type="date"] {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-primary:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.alert {
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>