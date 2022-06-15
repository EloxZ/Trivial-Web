<?php
	require_once("classes/IntegrationHelper.php");
	require_once("classes/UserData.php");
	require_once("classes/ConfigurationData.php");
	
	session_start();
	
	//Parameters:
	$userId = IntegrationHelper::get_optional_param('userid');
	$userFirstName = IntegrationHelper::get_optional_param('firstname');
	$userLastName = IntegrationHelper::get_optional_param('lastname');
	$demoType = IntegrationHelper::get_optional_param("demotype");
	$language = IntegrationHelper::get_optional_param("language");
	$_SESSION['language']=$language;
	$oneStep = ($demoType=="onestep");
	
	$configurationData = $_SESSION['configurationData'];
	$integrationHelper = $_SESSION['integrationHelper'];

	//Useful strings:
	$nextStep="integration_step1.php";
	if ($oneStep){
		$nextStep="integration_allstep.php";
	}else{
		$userData = new UserData();
		$userData->setFirstName($userFirstName);
		$userData->setLastName($userLastName);
		$userData->setUserName($userId);
		$userData->setIsTeacher(false);
		$userData->setSystemIdentifier($configurationData->getSystemIdentifier());

		$_SESSION['userData']=$userData;
	}
?>

<html>
<head>
	<title>
	SIETTE integration demo
	</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<body>
<h3>Before to start:</h3>
<p>
Before making a SIETTE test, an instance have to be created. This can be done
previously in an area only allowed to teachers.<br>
You have to choose the subject, the test id and whether the test is going to be 
collaborative.
</p>
<div id="result_invocation_services"></div>

<script src="js/chainedmenu.js" type="text/javascript"></script>
<script src="js/sietteajax.js" type="text/javascript"></script>
<form name="form" method="post" action="<?php echo($nextStep) ?>">
	<table align="center" cellpadding="5" cellspacing="0">
		<tr>
			<td>subjects</td>
			<td>tests</td>
			<td>modes</td>
		</tr>
		<tr>
			<td><select name="idsubject" style="width:180px;"></select></td>
			<td><select name="idtest" style="width:160px;"></select></td>
			<td>
				<table>
			      <tr><td><input type="radio" name="iscolaborative" group="testmode" value="0" checked>Individual</input></td></tr>
			      <tr><td><input type="radio" name="iscolaborative" group="testmode" value="1">Collaborative</input></td></tr>
				</table>
			</td>
		</tr>
		<tr>
			<td colspan="3"><div id="change_info">&nbsp;</div></td>
		</tr>
		<tr>
			<td colspan="3">
				<br>
				Test information:<br>
				<textarea name="testinfo" readonly rows="8" cols="80"></textarea>
			</td>
		</tr>
	</table>	
	<input type="hidden" name="canbecolaborative" value=""/>
	<!-- This field is used in order to know which information can be shown at
	the end of a test. The possible values are 1) nothing; 2) the score;
	3) the correction of the attempt; and 4) the solution of the attempt 
	(it includes the correction) -->
	<input type="hidden" name="aftertest" value=""/>
	<!-- This field is used in order to know which information can be shown 
	after a test is finished (for example in a summary of the results of a
	student). The possible values are 1) nothing; 2) the score;
	3) the correction of the attempt; and 4) the solution of the attempt 
	(it includes the correction) -->
	<input type="hidden" name="aftersessions" value=""/>
	<!-- This field is used to know the maximum score that can be given
	by SIETTE to the selected test (it could be 100, 100%, 10 ...) -->
	<input type="hidden" name="maxscore" value=""/>
	
	<p>
	The first step is to check if the session contains an authenticated 
	credential for the external user. <br>
	If this credential exists then we can go to step 2 directly (to start 
	the authentication process). <br>
	If it does not exist, the next step is to check if this external user 
	has been already registered in SIETTE.<br>
	
	<?php 
	if	($oneStep){
		?>
		<input type="hidden" name="userid" value="<?php echo($userId); ?>">
		<input type="hidden" name="firstname" value="<?php echo($userFirstName); ?>">
		<input type="hidden" name="lastname" value="<?php echo($userLastName); ?>">
		<?php 
	}
	?>
<hr>
	<center>
		<input type="submit" value="next">
	</center>

<script language="JavaScript" type="text/javascript">
<!--
  function onLoadNewInfo(str){
  	 var prevcontent = null;
  	 resetInfo(str, "result_invocation_services", document.form.iscolaborative, document.form.canbecolaborative, document.form.testinfo, document.form.aftertest, document.form.aftersessions, document.form.maxscore, null, document.form.idsubject, document.form.idtest, prevcontent);
  }
  
  function checkLoadOk(){
  	var infoContainer = document.getElementById("change_info");
  	if (document.form.idsubject.length<=1){
  		infoContainer.innerHTML="<b>No subject has been received.<br>Probably you haven't a subject defined in SIETTE or you haven't permission to the subject used for the test</b>";
  		document.form.action="integration.php";
  	}
  }
  
  function reloadTestInfo(){
  	 document.form.idsubject.disabled=true;
  	 document.form.idtest.disabled=true;
  	 send("gettestsinfo.php", "change_info", "Loading information ...", "Error", "URL not found", onLoadNewInfo, checkLoadOk);
  	 document.form.idsubject.disabled=false;
  	 document.form.idtest.disabled=false;
  }
  
  document.onload=reloadTestInfo();
  -->
</script>
</form>
</body>
</html>

