<?php
	require_once("classes/IntegrationHelper.php");
	require_once("classes/UserData.php");
	require_once("classes/ConfigurationData.php");
	
	session_start();
	
	//Parameters:
	$idtest = IntegrationHelper::get_optional_param('idtest');
	$_SESSION['idtest']=$idtest;
	
	$iscolaborative = IntegrationHelper::get_optional_param('iscolaborative');
	$iscolaborative = $iscolaborative=="1";
	

	$_SESSION['iscolaborative']=$iscolaborative;
	
	$aftertest = IntegrationHelper::get_optional_param('aftertest');

	$_SESSION['aftertest']=$aftertest;
	
	$aftersessions = IntegrationHelper::get_optional_param('aftersessions');

	$_SESSION['aftersessions']=$aftersessions;
	
	$userData = $_SESSION['userData'];
	$integrationHelper = $_SESSION['integrationHelper'];
	
	//Useful strings:
	$nextStep="integration_step2.php";
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
<h3>Step 1: check if the user exists in SIETTE</h3>
<p>
The external system must invoke a method using SOAP to check if  
the user is registered in Siette database. If it is not, the user
should be registered before continuing.
</p>

<?php
	try {
		//Service invocation
		$result = $integrationHelper->invokeServiceCheckExitsUser(
					$userData->getUserName());
		
		// Alternatively you can call 
		// $integrationHelper->checkUserStep(userData) method. Although
		// this method is easier to use, we have use invokeServiceCheckExitsUser
		// method that is at lower level to show the posibilities
		
		echo("The user <i>" . $userData->getUserName() .
			"</i> has been checked and "); 
		if (isset($result) && $result){
			echo("this user <b>already exists</b>");
		}else if (isset($result)){
			echo("this user <b>doesn't exists,</b> therefore it is " .
				"necessary to register it in SIETTE");
			$nextStep="integration_step1_2.php";
		}else{
			$nextStep="integration.php";
			echo("<br><b>There was some error, try again.</b>");
		}
	}catch (Exception $e) {
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
