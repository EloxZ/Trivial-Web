<?php
    session_start();

	require_once("classes/IntegrationHelper.php");
	require_once("classes/ConfigurationData.php");
	require_once("classes/UserData.php");

    $configurationData = new ConfigurationData();
	$configurationData->setSystemIdentifier("integrationdemo");
	$configurationData->setPrivateKeyFile("security/demo_priv.pem");
	
	$integrationHelper = new IntegrationHelper($configurationData);

	$_SESSION['configurationData']=$configurationData;
	$_SESSION['integrationHelper']=$integrationHelper;
	
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
<h1>SIETTE integration demo</h1>
<p>
This demo shows all the required steps to integrate a
SIETTE test into another external system.
</p>

<form method="post" action="integration_step0.php">

Choose a type of demo:
<select name="demotype">
	<option value="stepbystep">Step by step</option>
	<option value="onestep">All in one step</option>
</select>
<p>

<h3>You should provide user data (from the external system) </h3>

	<table align="center" border="1" cellpadding="5" cellspacing="0">
		<tr>
			<td>User identifier:</td>
			<td><input type="text" name="userid" value="demo"></td>
		</tr>
		<tr>
			<td>User first name:</td>
			<td><input type="text" name="firstname" value="demo_first_name"></td>
		</tr>
		<tr>
			<td>User last name:</td>
			<td><input type="text" name="lastname" value="demo_last_name"></td>
		</tr>
		<tr>
			<td>SIETTE Language:</td>
			<td><select name="language" id="language">
					<option value="english">English</option>
					<option value="espanol">Español</option>
					<option value="deutsch">Deutsch</option>
				</select></td>
		</tr>
	</table>
	<p>
and choose a test to perform.
	<hr>
	<center>
		<input type="submit" value="next">
	</center>
</form>
</body>
</html>
