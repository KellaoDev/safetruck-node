<template>
  <head>
    <meta charset="UTF-8">
    <title>Análises Graficas</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="../styles/analyze.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body>
    <div class="title">
      <h1>Análise de Checklists</h1>
    </div>
    <div class="dashboard">

      <div class="report-card">
        <div class="title-card">
          <h2>Gerar relatório de saídas e entradas</h2>
        </div>
        <div class="filter-dates">
          <label for="dateStart">Data Início:</label>
          <input type="date" name="dateStart" id="dateStart">
          <label for="dateEnd" class="dateEnd">Data Fim:</label>
          <input type="date" name="dateEnd" id="dateEnd">
          <button type="submit">Gerar Relatório</button>
        </div>
      </div>

      <div>
        <div class="card">
          <h2>Checklists Pendentes</h2>
        </div>

        <div class="card">
          <h2>Checklists Liberados</h2>
        </div>

        <div class="card">
          <h2>Status dos Itens</h2>
        </div>

        <div class="card">
          <h2>Métricas Gerais</h2>
        </div>
      </div>
    </div>

    <div>
      <button class="backButton">Voltar</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.4/xlsx.full.min.js"></script>
  </body>
</template>