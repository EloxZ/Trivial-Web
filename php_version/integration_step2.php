<?php
	require_once("classes/IntegrationHelper.php");
	require_once("classes/UserData.php");
	require_once("classes/ConfigurationData.php");
	
	session_start();
		
	$userData = $_SESSION['userData'];
	$configurationData = $_SESSION['configurationData'];
	$integrationHelper = $_SESSION['integrationHelper'];
	
	//Useful strings:
	$nextStep="integration_step3.php";
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
<h3>Step 2: Authenticating and getting a credential</h3>
<p>
Now, the user should be authenticated in SIETTE using another web service.
The web service returns a credential that must be stored by 
the external system for future use in the session.
<?php
   	try {
    	$resultEncoded = $integrationHelper->sign_string($stringToSign);
		echo("<p>Generated sign for \"user-system\"=\"".
		"<font face='courier'>" . $stringToSign . "</font>\" " . 
		"(Base 64): " . $resultEncoded . "<br>" .
		"This signature is used to authenticate the user.<br><p>");
		
		// Alternatively you can call 
		// $token = $integrationHelper->authenticateUserStep(
		//    $userData->getUserName()) 
		// method without to have to sign the string (this method does 
		// automatically). 
		// We have use invokeServiceAuthenticateUser method that is at lower 
		// level to show the generated sign for debug purposes
		
		//Service invocation
		$result = $integrationHelper->invokeServiceAuthenticateUser(
			$userData->getUserName(), $resultEncoded);
		
		if (isset($result)){
			$token = urlencode($result);
			echo("<br>The user has been authenticated and the " .
					"credential obtained is:<br>" . $token . "<p> ");

			$_SESSION['token']=$token;
		}else{
			$nextStep="integration.php";
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

