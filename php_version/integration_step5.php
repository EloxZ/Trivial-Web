<?php
	require_once("classes/IntegrationHelper.php");
	require_once("classes/UserData.php");
	require_once("classes/ConfigurationData.php");	
	
	session_start();
	
	$top=IntegrationHelper::get_optional_param('top');
	
?>
<html>

<?php
	if (!isset($top)){
		?>
<head>
	<title>
	SIETTE integration demo
	</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	
	<!-- 
		This javascript is used to open the page not in the iframe where the
		test has been done, but in the top frame. Another posibility is
		to redirect to other page for example integration_step6.php, and
		this page could get the siettesession value stored at the session
		to invoke the SIETTE Web Service, in order to obtaing the calification.
	-->
   	<script language="JavaScript" type="text/javascript">
   			top.location=window.document.location+"&top=true";
   	</script>
</head>
		<?php
	}else{
		//Alternatively we can also get the parameter stored in the session
		//Parameters:
		$siettesession = IntegrationHelper::get_optional_param('siettesession');
		
		$idtestString = $_SESSION['idtest'];
		$aftertest = $_SESSION['aftertest'];
		$aftersessions = $_SESSION['aftersessions']; 
		$token = $_SESSION['token'];
		$language = $_SESSION['language'];
		$integrationHelper = $_SESSION['integrationHelper'];
		$configurationData = $_SESSION['configurationData'];

		//Useful strings:
		$nextStep="integration.php";
?>

<head>
	<title>
	SIETTE integration demo
	</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
</head>
<body>
<h3>Step 5: getting the score</h3>
<p>
When the test has finished, SIETTE redirects the browser to the desired URL
that has been given at the beginning. Finally, the external system can retrieve
the score obtained in the test.
</p>

<?php
	try {               
    	//Service invocation
    	$siettesession = 0 + $siettesession;
    	$result = $integrationHelper->invokeServiceGetScore($siettesession);
    	$aftertestvalue = 0 + $aftertest;
    	$aftersessionsvalue = 0 + $aftersessions;
    	
		if (isset($result)){
			$grade = $result;
			$gradeString = "";
			
			if ($aftertestvalue == TEST_SHOW_NOTHING){
				$gradeString = "<p>It is not allowed to see the score of this test.<p>";
			}else if ($aftertestvalue == TEST_SHOW_SCORE){
				$gradeString = "<p>The score given by SIETTE is: " . $grade . ".<p>";
			}else {
				//The solution and/or correction can be seen
				$iscolaborative=$_SESSION['iscolaborative'];
				$idtest = 0 + $idtestString;
				$urlReport = $integrationHelper->getSietteReportURL(
						$siettesession,$idtest, $token,
						$iscolaborative, $language,
						$configurationData->getUrlSiette());
				$gradeString = "<p>The score given by SIETTE is: " . $grade . 
						" <a href=\"" . $urlReport . 
						"\" target=\"_blank\">(view session)</a>.<p>";
			}
			
			echo($gradeString);
			$afterSessionsString = "After this session the test is configured to: ";
			switch ($aftersessionsvalue){
			case TEST_SHOW_NOTHING:
				$afterSessionsString.= " avoid the access to the results";
				break;
			case TEST_SHOW_SCORE:
				$afterSessionsString.= " allow access to the score only";
				break;
			case TEST_SHOW_CORRECTION:
				$afterSessionsString.= " allow access to the correction only";
				break;
			case TEST_SHOW_SOLUTION:
				$afterSessionsString.= " allow access to the solution";
				break;
			default:
				;
			}
			echo("<p>".$afterSessionsString."</p>");
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
		<input type="submit" value="Restart demo">
	</center>
</form>
</body>
</html>

<?php
	}
?>