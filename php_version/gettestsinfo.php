<?php  // $Id: gettestsinfo.php,v 1.2 2010-10-11 17:00:26 jgalvez Exp $
/**
 * This page uses SOAP to request the subjects and tests list to SIETTE. It
 * generates a XML file with the info.
 * The page is invoqued by AJAX to update the content and the information related to the 
 * available SIETTE tests 
 *  
 * @author Jaime G&aacute;lvez Cordero (jgalvez@lcc.uma.es)
 * @version $Id: gettestsinfo.php,v 1.2 2010-10-11 17:00:26 jgalvez Exp $
 * @package siettetest
 **/
 
    require_once("classes/IntegrationHelper.php");
	require_once("classes/UserData.php");
	require_once("classes/XmlDefinition.php");
	
	session_start();
	
	$userData = $_SESSION['userData'];
	$integrationHelper = $_SESSION['integrationHelper'];
	$language = $_SESSION['language'];
	$userId = $userData->getUserName();
	
    start_element_without_attr(MAIN_ELEM);
    start_element_without_attr(AJAXRESULT_ELEM);
    start_CDATA_element();
    try {
    	$result = $integrationHelper->invokeServiceGetTestListStudent(
			$userId,$language);
    }catch (Exception $e){
    	echo("Exception: " . $e->getMessage());
    }
	end_CDATA_element();
    end_element(AJAXRESULT_ELEM);
    
	echo_test_default("Select a test");
	echo_asig_default("Select a subject");
	
	$i=0;
	if (isset($result)){
		foreach ($result as $i => $subject){
			$i++;
			$subjectname=html_entity_decode($subject['name'], ENT_QUOTES, 'ISO-8859-1');
			$idsubject=html_entity_decode($subject['id'], ENT_QUOTES, 'ISO-8859-1');
			$subjectname=utf8_encode($subjectname);
			
			start_element(SUBJECT_ELEM);
    		echo_attr(ID_ATTR,$idsubject);
    		close_begin_element();
			echo_name($subjectname);
			
			if (isset($subject['tests'])){
				foreach ($subject['tests'] as $j => $test){
					$testname=html_entity_decode($test['name'], ENT_QUOTES, 'ISO-8859-1');
					$testname=utf8_encode($testname);
					$testdescription=html_entity_decode($test['descripcion'], ENT_QUOTES, 'ISO-8859-1');
					$testdescription=utf8_encode($testdescription);
					$testinfo=addSlashes($testdescription);
					if (!$test['colaborativo']){
						$canbecolaborative='false';
					}else{
						$canbecolaborative='true';
					}
					
					$solutionaftertest=$test['solucionTrasTest'];
					$solutionaftersessions=$test['solucionTrasSesiones'];
					$maxscore = $test['maximapuntuacion'];
					if (!$maxscore){
						$maxscore = 100;
					}
					
					echo_test($test['id'],$canbecolaborative,$solutionaftertest,$solutionaftersessions,$maxscore, $testname,$testinfo);
				}
			}
			end_element(SUBJECT_ELEM);
		}
	}
	end_element(MAIN_ELEM);
?>
