<?php
	require_once("classes/IntegrationHelper.php");
	require_once("classes/UserData.php");
	require_once("classes/ConfigurationData.php");
	
	session_start();
		
	$userData = $_SESSION['userData'];
	$configurationData = $_SESSION['configurationData'];
	$integrationHelper = $_SESSION['integrationHelper'];
	
	//Useful strings:
	$nextStep="integration_step2.php";
	$stringToSign = $userData->getUserName() . $configurationData->getSystemIdentifier();
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
<h3>Step 1.2: register the external user in SIETTE</h3>
<p>
In order to take a SIETTE test, it is necessary to be a registered user. 
The external system can register a user in SIETTE using the appropriated web service.
</p>
<?php
	try {
    	$resultEncoded = $integrationHelper->sign_string($stringToSign);
		echo("<br>Generated sign for " . $stringToSign . 
		" (Base 64): " . $resultEncoded . "<br>");
		
		// Alternatively you can call 
		// $integrationHelper->registerUserStep($userData) method
		// without to have to sign the string (this method does automatically).
		// We have use invokeServiceRegisterUser method that is at lower level 
		// to show the generated sign for debug purposes
		
		//Service invocation
		$result = $integrationHelper->invokeServiceRegisterUser(
			$userData, $resultEncoded);
		
		if (isset($result) && $result){
			echo("The user <i>" . $userData->getUserName() . 
			"</i> has been registered");
		}else{
			$nextStep="integration.jsp";
			echo("<br><b>There was some error, try again.</b>");
		}
    }catch (Exception $e){
    	echo("Exception: " . $e->getMessage());
    	$nextStep="integration.php";
    }
?>
<hr>
<form method="post" action="<?php echo($nextStep) ?>">
	<center>
		<input type="submit" value="next">
	</center>
</form>
</body>
</html>
