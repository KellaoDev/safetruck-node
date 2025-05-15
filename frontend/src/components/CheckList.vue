<template>

  <head>
    <meta charset="UTF-8">
    <title>Checklist - SafeTruck</title>
    <link rel="stylesheet" href="../styles/checklist.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body>
    <h1 class="title">Preencher Checklist</h1>

    <div class="box">
      <form>
        <div class="positionOne">
          <label for="plate">Placa do Caminhão:</label>
          <input class="plates" type="text" id="plate" required><br>

          <label for="motorist">Nome do Motorista:</label>
          <input class="plates" type="text" id="motorist" readonly required><br>
        </div>

        <div class="positionTwo">
          <label>Freios:</label><br>
          <div class="items">
            <label><input type="radio" name="brakes" value="OK" required> OK</label>
            <label><input type="radio" name="brakes" value="N/OK" required> N/OK</label><br>
          </div>

          <label>Faróis:</label><br>
          <div class="items">
            <label><input type="radio" name="headlights" value="OK" required> OK</label>
            <label><input type="radio" name="headlights" value="N/OK" required> N/OK</label><br>
          </div>

          <label>Pneus:</label><br>

          <div class="items">
            <label><input type="radio" name="pneus" value="OK" required> OK</label>
            <label><input type="radio" name="pneus" value="N/OK" required> N/OK</label><br>
          </div>
        </div>

        <button class="button" type="submit">Salvar Checklist</button>
      </form>
    </div>

    <div>
      <button class="backButton">
        Voltar
      </button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="module" src="../../src/checklist.js"></script>
  </body>
</template>