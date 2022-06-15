<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: index.php");
}
const AllowInclude = TRUE;
?>

<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css?v=1.1">

    <title>TriviSiette | Crear Test</title>
    <meta name="description" content="Página de inicio de TriviSiette.">
    <meta name="author" content="Eloy Barrionuevo Jiménez">

    <!-- CSS Boostrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
</head>

<body>
<!-- Menú -->
<nav class="navbar navbar-expand-md navbar-dark bg-orangeweb">
    <a class="navbar-brand" href="index.php">TriviSiette</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <a class="nav-item nav-link " href="index.php">Inicio</a>
            <a class="nav-item nav-link active" href="mytests.php">Mis tests</a>
        </div>
    </div>

    <form method="post" action="index.php">
        <input name="cerrarSesion" type="hidden" value="">

        <button class="btn btn-sm btn-danger" type="submit">Cerrar Sesión</button>
    </form>


</nav>

<div class="container mt-5">
    <h1>Crear Test de Siette</h1>
    <h4 class="mt-4">Para abrir el editor de tests de Siette y crear tus tests haz click en crear test.</h4>
    <p></p>
    <h5>[DEBUG]</h5>
    <?php
    if (isset($_SESSION['user'])) {
        var_dump($_SESSION['user']);
        include "includes/siette_auth.php";
    }
    ?>
</div>

<!-- Scripts Boostrap -->
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>
