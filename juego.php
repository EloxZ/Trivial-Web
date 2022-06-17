<?php
session_start();
$token_value = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!is_null($_POST['cerrarSesion'])) {
        session_unset();
    }
}

const AllowInclude = TRUE;
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/cube.css?v=1.2">
    <link rel="stylesheet" href="css/style.css?v=1.1">

    <title>TriviSiette | Inicio</title>
    <meta name="description" content="Página de inicio de TriviSiette.">
    <meta name="author" content="Eloy Barrionuevo Jiménez">


    <!-- CSS Boostrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <!-- Scripts Boostrap -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>


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
            <a class="nav-item nav-link active" href="index.php">Inicio</a>
            <?php if (isset($_SESSION['user'])) { ?> <a class="nav-item nav-link" href="mytests.php">Mis tests</a> <?php } ?>
        </div>

    </div>
    <?php if (isset($_SESSION['user'])) { ?>
        <form method="post" action="index.php">
            <input name="cerrarSesion" type="hidden" value="">
            <button class="btn btn-sm btn-danger" type="submit">Cerrar Sesión</button>
        </form>
        <?php
    } else { ?>
        <div class="row justify-content-center">
            <a class="btn btn-info" href="login.php">Iniciar Sesión</a>
            <div class="mr-2"></div>
            <a class="btn btn-outline-dark mr-3" href="signup.php">Registrarse</a>
        </div>
    <?php } ?>
</nav>

<div class="container mt-5">
    <h1>Bienvenido a TriviSiette</h1>
    <h4 class="mt-4">En TriviSiette podrás crear o unirte a concursos de preguntas utilizando los servicios de Siette. Para crear un concurso, empieza creando un test en Siette e invita a los concursantes
        compartiendo el código.</h4>
    <p></p>
    <h5>[DEBUG]</h5>
    <?php
    if (isset($_SESSION['user'])) {
        var_dump($_SESSION['user']);
        include "includes/siette_auth.php";
        if (isset($_SESSION['token'])) {
            $token_value = $_SESSION['token'];
        }
    }
    ?>
</div>



<div class="container-fluid">
    <div id="div-canvas" class="row justify-content-center">
        <div class="col-12 col-lg-2 status-container">
            <h3>Jugadores</h3>
            <!-- Dado -->
            <section class="dice-container mt-5">
                <div id="cube">
                    <div id="frontFace" class="front">
                        <span class="dot dot1"></span>
                    </div>
                    <div id="backFace" class="back">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                    </div>
                    <div id="rightFace" class="right">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                    </div>
                    <div id="leftFace" class="left">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                        <span class="dot dot4"></span>
                    </div>
                    <div id="topFace" class="top">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                        <span class="dot dot4"></span>
                        <span class="dot dot5"></span>
                    </div>
                    <div id="bottomFace" class="bottom">
                        <span class="dot dot1"></span>
                        <span class="dot dot2"></span>
                        <span class="dot dot3"></span>
                        <span class="dot dot4"></span>
                        <span class="dot dot5"></span>
                        <span class="dot dot6"></span>
                    </div>
                </div>
            </section>
        </div>
        <div id="trivia" class="col-12 col-lg-8" style="height: 1200px; margin: auto">
        </div>
        <div class="col-12 col-lg-2 log-container">
            <h3>Logs</h3>
            <textarea id="logs" style="resize: none; width: 100%; height: 70%;" readonly="true"></textarea>
        </div>
    </div>
</div>
<!-- Script Trivia -->
<script type="text/javascript">
    var token='<?php echo $token_value;?>';
</script>
<script src="/js/game/trivia.js" type="module"></script>
</body>
</html>
