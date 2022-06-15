<?php
	require_once("classes/IntegrationHelper.php");
	require_once("classes/UserData.php");
	require_once("classes/ConfigurationData.php");	
	
	session_start();
	
	$idTest = IntegrationHelper::get_optional_param('idtest');
	$userId = IntegrationHelper::get_optional_param('userid');
	$userFirstName = IntegrationHelper::get_optional_param('firstname');
	$userLastName = IntegrationHelper::get_optional_param('lastname');
	$iscolaborative = IntegrationHelper::get_optional_param('iscolaborative');
	$iscolaborative = $iscolaborative=="1";
	$correctionmode = IntegrationHelper::get_optional_param('correctionmode');
	$_SESSION['correctionmode']=$correctionmode;
	$language = $_SESSION['language'];
	$solutionmode = IntegrationHelper::get_optional_param('solutionmode');
	$_SESSION['solutionmode']=$solutionmode;
	
	$configurationData = new ConfigurationData();
	$configurationData->setSystemIdentifier("integrationdemo");
	$configurationData->setPrivateKeyFile("security/demo_priv.pem");
	
	$integrationHelper = new IntegrationHelper($configurationData);

	$URL_END_TEST_BACK = 
		DEFAULT_SIETTE_URL.".external.demo/integration_step5.php";

	$_SESSION['configurationData']=$configurationData;
	$_SESSION['integrationHelper']=$integrationHelper;
	
	$userData = new UserData();
	$userData->setFirstName($userFirstName);
	$userData->setLastName($userLastName);
	$userData->setUserName($userId);
	$userData->setIsTeacher(false);
	$userData->setSystemIdentifier($configurationData->getSystemIdentifier());

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
<h3>All protocol in only one step</h3>
<p>
With only a method the system can do all necessary steps (authentification,
registration if user doesn't exists, get a credential, and get a session). 
The values obtained from SIETTE are combined by this method to create an
URL that can be used to start the test, for instance, in an iframe <br>
When the test finishes, SIETTE will redirect the browser to an URL 
that should be provided by the external system.
</p>

	<?php
	try {
		$idTest = 0 + $idTest;
		$remoteAddr = "".$_SERVER['REMOTE_ADDR'];
		$urlStartTest = $integrationHelper->startTest($userData, $idTest, 
			$iscolaborative, $language, $URL_END_TEST_BACK, $remoteAddr);
		$token = $integrationHelper->getToken();
		$_SESSION['token']=$token;
		
		//Is necessary to get the siette session for obtain the associated
		//score in the page integration_step5.php
		$sietteSession = $integrationHelper->getSietteSession();
		$_SESSION['sietteSession']=$sietteSession;
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
