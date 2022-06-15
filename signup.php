<?php
    require 'vendor/autoload.php';
    session_start();

    // Si usuario esta logueado redirigir a index
    if (isset($_SESSION['user'])) {
        header('Location: index.php');
    }

    function validateString($str) {
        return !preg_match('/[^A-Za-z0-9.#\\-$_]/', $str);
    }

    function validateEmail($email) {
        $regex = "/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/";
        return preg_match($regex, $email);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            // Conexión con base de datos
            $client = new MongoDB\Client("mongodb+srv://user:QaUUgVhzssIgv1vK@cluster0.zo1ht.mongodb.net/triviaDatabase?retryWrites=true&w=majority");
            $users = $client->triviaDatabase->users;

            // Validación Email
            $msgError = "";
            $email = $_POST['inputEmail'];
            if (!validateEmail($email)) {
                $msgError = $msgError."El formato del correo introducido no es correcto.\n";
            }
            if (strlen($email) < 3 || strlen($email) > 256) {
                $msgError = $msgError."El correo electrónico debe tener de 3 a 256 caracteres.\n";
            }
            $realEmail = strtolower($email);
            $result = $users->findOne(['email' => $realEmail]);
            if (!is_null($result)) {
                $msgError = $msgError."Ya se han registrado con ese correo electrónico.\n";
            }

            // Validación Nick
            $nick = $_POST['inputNick'];
            if (!validateString($nick)) {
                $msgError = $msgError."El nombre de usuario sólo puede contener los caracteres a-z, A-Z, 0-9, #, -, _, $.\n";
            }
            if (strlen($nick) < 3 || strlen($nick) > 26) {
                $msgError = $msgError."El nombre de usuario debe contener de 3 a 26 caracteres.\n";
            }
            $realNick = strtolower($nick);
            $result = $users->findOne(['nick' => $realNick]);
            if (!is_null($result)) {
                $msgError = $msgError."El nombre de usuario ya existe.\n";
            }

            // Validación contraseña
            $password = $_POST['inputPassword'];
            if (!validateString($password)) {
                $msgError = $msgError."La contraseña sólo puede contener los caracteres a-z, A-Z, 0-9, #, -, _, $.\n";
            }
            if (strlen($password) < 6 || strlen($password) > 26) {
                $msgError = $msgError."La contraseña debe contener de 6 a 26 caracteres.\n";
            }

            if (strlen($msgError) == 0) {
                $result = $users->insertOne( [ 'nick' => $realNick, 'email' => $realEmail, 'password' => password_hash($password, PASSWORD_DEFAULT)] );
                $msgSuccess = "Te has registrado correctamente.";
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

    <title>TriviSiette | Registro</title>
    <meta name="description" content="Página de registro de TriviSiette.">
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
    <?php
    if (isset($msgSuccess)) {
        ?>
        <div class="alert alert-success" role="alert">
            <?php echo $msgSuccess."  "; ?>
            <div class="spinner-border" role="status">
            </div>
        </div>
        <?php
        header( "refresh:1; url=login.php" );
    }
    ?>

    <!-- Formulario de registro -->
    <div class="container light-container p-4 mt-5 rounded border">
        <form method="post" action="signup.php">
            <div class="row mb-5 justify-content-center"><h1>Registro</h1></div>
            <div class="row mb-3 justify-content-center">
                <label for="inputNick" class="col-sm-2 col-form-label">Nombre de usuario</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="inputNick" name="inputNick">
                </div>
            </div>
            <div class="row mb-3 justify-content-center">
                <label for="inputEmail" class="col-sm-2 col-form-label">Correo electrónico</label>
                <div class="col-sm-3">
                    <input type="email" class="form-control" id="inputEmail" name="inputEmail">
                </div>
            </div>
            <div class="row mb-3 justify-content-center">
                <label for="inputPassword" class="col-sm-2 col-form-label">Contraseña</label>
                <div class="col-sm-3">
                    <input type="password" class="form-control" id="inputPassword" name="inputPassword">
                </div>
            </div>
            <div class="row justify-content-center mt-5">
                <button type="submit" class="btn btn-lg btn-info">Registrarse</button>
            </div>
        </form>
    </div>


    <!-- Scripts Boostrap -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>
