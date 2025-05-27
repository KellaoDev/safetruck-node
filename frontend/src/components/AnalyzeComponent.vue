<script>
import { Chart, registerables } from 'chart.js';
import api from '../api/CheckListApi';

export default {
  name: 'ChecklistsChart',
  data() {
    return {
      chart: null,
      chartData: {
        labels: ['Pendentes', 'Liberados', 'Retornados', 'Manutenção'],
        datasets: [{
          label: 'Checklists por Status',
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 1,
          data: [0, 0, 0, 0],
        }]
      }
    }
  },
  async mounted() {
    Chart.register(...registerables)
    await this.fetchData()
    this.renderChart()
    this.interval = setInterval(this.fetchData, 30000)
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
    clearInterval(this.interval)
  },
  methods: {
    async fetchData() {
      try {
        const safeFetch = async (fn) => {
          try {
            const res = await fn()
            return res.data.meta.total ?? 0
          } catch {
            return 0
          }
        }

        const [pending, released, returned, maintenance] = await Promise.all([
          safeFetch(api.getPendingChecklists),
          safeFetch(api.getReleaseChecklists),
          safeFetch(api.getReturnChecklists),
          safeFetch(api.getMaintenanceChecklists),
        ])

        this.chartData.datasets[0].data = [pending, released, returned, maintenance]

        if (this.chart) {
          this.chart.update()
        }
      } catch (error) {
        console.error('Erro inesperado ao buscar dados para o gráfico:', error)
      }
    },
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d')

      if (this.chart) {
        this.chart.destroy()
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  family: "'Open Sans', sans-serif",
                  weight: '700',
                  size: 14
                },
                color: '#c91804'
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}`
                }
              },
              backgroundColor: '#c91804',
              titleFont: {
                family: "'Open Sans', sans-serif",
                weight: '700',
                size: 16
              },
              bodyFont: {
                family: "'Open Sans', sans-serif",
                size: 14
              },
              cornerRadius: 6,
              padding: 10,
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
                color: '#c91804',
                font: {
                  family: "'Open Sans', sans-serif",
                  weight: '600',
                  size: 14
                }
              },
              grid: {
                color: '#dbdbd9'
              }
            },
            x: {
              ticks: {
                color: '#c91804',
                font: {
                  family: "'Open Sans', sans-serif",
                  weight: '600',
                  size: 14
                }
              },
              grid: {
                display: false
              }
            }
          }
        }
      })
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>

  <button class="button-back" type="button" @click="$router.go(-1)">Voltar</button>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  max-width: 900px;
  margin: 20px auto;
  background-color: whitesmoke;
  border-radius: 20px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  padding: 25px;
  user-select: none;
  font-family: 'Open Sans', sans-serif;
  color: #c91804;
  transition: box-shadow 0.3s ease;
}

.chart-container:hover {
  box-shadow: 0 0 20px rgba(201, 24, 4, 0.7);
}

.button-back {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #c91804;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

canvas {
  image-rendering: -webkit-optimize-contrast
}
</style>
