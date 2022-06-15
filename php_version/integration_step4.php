<?php
	require_once("classes/IntegrationHelper.php");
	require_once("classes/UserData.php");
	require_once("classes/ConfigurationData.php");
	
	session_start();
		
	$userData = $_SESSION['userData'];
	$configurationData = $_SESSION['configurationData'];
	$integrationHelper = $_SESSION['integrationHelper'];
	
	$URL_END_TEST_BACK = "https://trivi-siette.herokuapp.com/php_version/integration_step5.php";
		
	//Useful strings:
	$nextStep="integration_step4.php";
	$urlStartTest="";
?>

<html>
<head>
	<title>
	SIETTE integration demo
	</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
</head>
<body>
<h3>Step 4: do the SIETTE test</h3>
<p>
The previous credential and session, can be used to take a test, which is
accessed by a SIETTE URL formed with some parameters: the credential
and test-id. The test can be started in an iframe <br>
When the test finishes, SIETTE will redirect the browser to an URL
that should be provided by the external system.
</p>

	<?php

	try {
		$token = $_SESSION['token'];
		$language = $_SESSION['language'];
		$siettesession = $_SESSION['sietteSession'];
		$siettesession = $siettesession+0;

		$urlStartTest = $integrationHelper->getStartTestURL($siettesession,
    			$token, $language, $URL_END_TEST_BACK);
    ?>
    <iframe src='<?php echo($urlStartTest) ?>' width='95%' height='600px' align="middle">
			Your browser doesn't support frames.
	</iframe>
    <?php
    }catch (Exception $e){
    	echo("Exception: " . $e->getMessage());
    	//If there is an error. go back to initial page:
    ?>
	    <form method="post" action="integration.php">
			<center>
				<input type="submit" value="next">
			</center>
		</form>
    <?php
    }
	?>
</body>
</html>
