<template>

  <head>
    <meta charset="UTF-8">
    <title>Retorno de Caminhões - SafeTruck</title>
    <link rel="stylesheet" href="../styles/register.css">
  </head>

  <div class="container">
    <div class="box">
      <h1>Cadastro de Usuário</h1>

      <div class="form">
        <form>
          <label for="email">E-mail:</label>
          <input type="email" name="email" required><br>

          <label for="nome">Nome:</label>
          <input type="text" name="name" required><br>

          <label for="senha">Senha:</label>
          <input type="password" name="password" required><br>

          <label for="profile">Perfil:</label>
          <select id="profile" required>
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select><br>

          <button class="submitButton" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  </div>

  <div>
    <button class="backButton">Voltar</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</template>
