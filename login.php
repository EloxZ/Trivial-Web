<?php
    require 'vendor/autoload.php';
    session_start();

    // Si usuario esta logueado redirijir a index
    if (isset($_SESSION['user'])) {
        header('Location: index.php');
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            $msgError = "";
            // Conexión con base de datos
            $client = new MongoDB\Client("mongodb+srv://user:QaUUgVhzssIgv1vK@cluster0.zo1ht.mongodb.net/triviaDatabase?retryWrites=true&w=majority");
            $users = $client->triviaDatabase->users;

            // Verificar nombre y contraseña
            $nick = $_POST['inputNick'];
            $realNick = strtolower($nick);
            $result = $users->findOne(['nick' => $realNick]);

            if (is_null($result) || !password_verify($_POST['inputPassword'], $result["password"])) {
                $msgError = "Datos incorrectos.";
            }

            if (strlen($msgError) == 0) {
                $_SESSION['user'] = array(
                    "nick" => $result["nick"],
                    "email" => $result["email"]
                );
                header('Location: index.php');
            }
        } catch (Exception $e) {
            $msgError = "Hubo un error al conectar con la base de datos. ".$e->getMessage();
        }
    }
?>

<!doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/style.css?v=1.1">

        <title>TriviSiette | Iniciar Sesión</title>
        <meta name="description" content="Página de acceso de TriviSiette.">
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
                <a class="nav-item nav-link" href="index.php">Inicio</a>

            </div>
        </div>
        <div class="row justify-content-center">
            <a class="btn btn-info" href="login.php">Iniciar Sesión</a>
            <div class="mr-2"></div>
            <a class="btn btn-outline-dark mr-3" href="signup.php">Registrarse</a>
        </div>
    </nav>

    <!-- Alertas -->
    <?php
    if (isset($msgError) && strlen($msgError) > 0) {
        ?>
        <div class="alert alert-danger" role="alert">
            <?php echo $msgError; ?>
        </div>
        <?php
    }
    ?>

    <!-- Formulario de acceso -->
    <div class="container light-container p-4 mt-5 rounded border">
        <form method="post" action="login.php">
            <div class="row mb-5 justify-content-center"><h1>Iniciar Sesión</h1></div>
            <div class="row mb-3 justify-content-center">
                <label for="inputNick" class="col-sm-2 col-form-label">Nombre de usuario</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="inputNick" name="inputNick">
                </div>
            </div>
            <div class="row mb-3 justify-content-center">
                <label for="inputPassword" class="col-sm-2 col-form-label">Contraseña</label>
                <div class="col-sm-3">
                    <input type="password" class="form-control" id="inputPassword" name="inputPassword">
                </div>
            </div>
            <div class="row justify-content-center mt-5">
                <button type="submit" class="btn btn-lg btn-info">Acceder</button>
            </div>

        </form>
    </div>


    <script src="js/scripts.js"></script>

    <!-- Scripts Boostrap -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    </body>
</html>
