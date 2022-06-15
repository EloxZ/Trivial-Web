<?php
	require_once("classes/IntegrationHelper.php");
	require_once("classes/UserData.php");
	require_once("classes/ConfigurationData.php");
	
	session_start();
		
	$userData = $_SESSION['userData'];
	$configurationData = $_SESSION['configurationData'];
	$integrationHelper = $_SESSION['integrationHelper'];
	
	$idtestString = $_SESSION['idtest'];
	$iscolaborative = $_SESSION['iscolaborative'];

	//Useful strings:
	$nextStep="integration_step4.php";
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
<h3>Step 3: Getting the SIETTE session</h3>
<p>
To take the test a new SIETTE session should be created.
This session will be provided by SIETTE to the external system. 
The session identifier, allows to start or resume a test session.
</p>

<?php

	try {
    	$resultEncoded = $integrationHelper->sign_string($stringToSign);
		echo("<p>Generated sign for \"user-system\"=\"".
		"<font face='courier'>" . $stringToSign . "</font>\" " . 
		"(Base 64): " . $resultEncoded . "<br>" .
		"This signature is used to authenticate the user.<br><p>");

		// Alternatively you can call 
		// $sietteSession = $integrationHelper->getSietteSessionStep(
		//    $userData->getUserName(), $idTest)
		// method without to have to sign the string (this method does 
		// automatically). We have use invokeServiceBeginTestSession method 
		// that is at lower level to show the generated sign for debug purposes
		
		//Service invocation
		$remoteAddr = "".$_SERVER['REMOTE_ADDR'];
		$idTest = $idtestString+0;
		$result = $integrationHelper->invokeServiceBeginTestSession(
			$idTest, $iscolaborative, $userData->getUserName(), 
			$resultEncoded, $remoteAddr);
		
		if (isset($result)){
			$siettesession = "".$result;
			$_SESSION['sietteSession']= $siettesession;
			echo("<br>The user has been authenticated and the session " . 
			"obtained is:<br>" . $siettesession . "<p> " .
			"Now the user can start the test.");
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
