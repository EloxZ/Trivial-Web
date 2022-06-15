<?php // $Id: XmlDefinition.php,v 1.2 2010-10-11 17:00:26 jgalvez Exp $
/**
 * This file is used to define the elements and attributes to be used in the
 * XML generated with the information received from SIETTE
 * 
 * @author Jaime G&aacute;lvez Cordero (jgalvez@lcc.uma.es)
 * @version $Id: XmlDefinition.php,v 1.2 2010-10-11 17:00:26 jgalvez Exp $
 **/

    const MAIN_ELEM = "sietteinfo";
    const AJAXRESULT_ELEM = "ajaxresult";
    const SUBJECT_ELEM = "subject";
    const TEST_ELEM = "test";
    const NAME_ELEM = "name";
    const DESCRIPTION_ELEM = "description";
    const TEST_DEFAULT_INFO_ELEM = "testdefault";
    const SUBJECT_DEFAULT_INFO_ELEM = "subjectdefault";
    const COLLABORATIVE_ATTR = "collaborative";
    const AFTERTEST_ATTR = "aftertest";
    const AFTERSESSIONS_ATTR = "aftersessions";
    const MAXSCORE_ATTR = "maxscore";
    const ID_ATTR = "id";
    
    function echo_cdata($content){
    	echo "<![CDATA[$content]]>";
    }
	
	function start_CDATA_element(){
    	echo "<![CDATA[";
    }
    
    function end_CDATA_element(){
    	echo "]]>";
    }

	function echo_element($name, $content){
    	echo "<$name>$content</$name>";
    }
    
    function start_element_without_attr($name){
    	echo "<$name>";
    }
    
    function start_element($name){
    	echo "<$name";
    }
    
    function close_begin_element(){
    	echo ">";	
    }
    
    function end_element($name){
    	echo "</$name>";
    }
    
    function echo_attr($name,$value){
    	echo " $name=\"$value\"";	
    }
    
    
    function echo_ajax_error($content){
    	echo_element(AJAXRESULT_ELEM, $content);
    }    
        
    function echo_asig_default($content){
    	echo_element(SUBJECT_DEFAULT_INFO_ELEM, $content);
    }
    
    function echo_test_default($content){
    	echo_element(TEST_DEFAULT_INFO_ELEM, $content);
    }
    
    function echo_name($content){
    	start_element(NAME_ELEM);
    	close_begin_element();
		echo_cdata($content);
    	end_element(NAME_ELEM);
    }
    
    function echo_description($content){
		start_element(DESCRIPTION_ELEM);
    	close_begin_element();
		echo_cdata($content);
    	end_element(DESCRIPTION_ELEM);
    }
    
    function echo_test($id,$collaborative,$aftertest,$aftersessions,$maxScore,$name,$description){
    	start_element(TEST_ELEM);
    	echo_attr(ID_ATTR,$id);
    	echo_attr(COLLABORATIVE_ATTR,$collaborative);
    	echo_attr(AFTERTEST_ATTR,$aftertest);
    	echo_attr(AFTERSESSIONS_ATTR,$aftersessions);
    	echo_attr(MAXSCORE_ATTR,$maxScore);
    	close_begin_element();
		
		echo_name($name);
		echo_description($description);
		    	
    	end_element(TEST_ELEM);
    }
?>
