<?php
	$root = realpath($_SERVER["DOCUMENT_ROOT"]);
	require $root.'/vendor/autoload.php';
	require_once("ConfigurationData.php");
	require_once("UserData.php");

	const SERVICE_REGISTER_USER = "registerUser";
	const SERVICE_BEGIN_TEST_SESSION = "beginTestSession";
	const SERVICE_AUTHENTICATE_USER = "authenticateUser";
	const SERVICE_CHECK_USER = "existsExternalUser";
	const SERVICE_GET_SCORE = "getSessionScore";
	const SERVICE_GET_SUBJECT_LIST_TEACHER = "getSubjectListTeacher";
	const SERVICE_GET_SUBJECT_LIST_STUDENT = "getSubjectListStudent";
	const SERVICE_GET_TEST_LIST_TEACHER = "getTestListTeacher";
	const SERVICE_GET_TEST_LIST_STUDENT = "getTestListStudent";

	const PRI_KEY_FILE = "demo_priv.pem";
	const TEST_SHOW_NOTHING = 0;
	const TEST_SHOW_SCORE = 1;
	const TEST_SHOW_CORRECTION = 2;
	const TEST_SHOW_SOLUTION = 3;
	
	
class IntegrationHelper { 
	var $config;
	var $sietteSession;
	var $token;
	
	function __construct($config){
		$this->config = $config;
	}
	
	public function getConfig() {
		return $this->config;
	}

	public function setConfig($config) {
		$this->config = $config;
	}
	
	public function getSietteSession() {
		return $this->sietteSession;
	}

	public function setSietteSession($sietteSession) {
		$this->sietteSession = $sietteSession;
	}
	
	public function getToken() {
		return $this->token;
	}
	
	public function setToken($token) {
		$this->token = $token;
	}
		
	////////////////////////////// Auxiliary methods:

/**
 * Signature of a string using SHA1withRSA alghorithm
 * 
 * @param string $string String to be signed
 * @param string $priv_key_file Path of the private key file
 * @return string Signature coded using base64
 **/

function sign_string($string){
	$priv_key_file = $this->config->getPrivateKeyFile();
	
	$signature = "";
	if (!file_exists($priv_key_file)){
		echo ("Error, private key file not found");
		return;
	}
	
	$file_priv = fopen($priv_key_file, "r");
	$filecontent = fread($file_priv, filesize($priv_key_file));
	fclose($file_priv);
	$pkeyid = openssl_get_privatekey($filecontent);
	openssl_sign($string, $signature, $pkeyid);
	
	return base64_encode($signature);
}

/**
 * Provides the URL to start a test. It is formed with the session id 
 * and the credential token.
 * 
 * @param idsession
 * @param token
 * @param response
 * @return
 */
public function getStartTestURL($idsession, $token, $language, $urlEndTestBack) {
	return $this->config->getUrlStartTest() . "?idsession=" . $idsession . 
		"&idioma=" . $language . "&auth=" . $token . "&urlback=" . 
			urlencode($urlEndTestBack . "?siettesession=" . $idsession);
}


////////////////////////////// Methods to invoke necessary web services:
	

/**
 * This method invokes the web service that gives the list of available 
 * tests for a teacher
 * 
 * @param $userName
 * @param $language
 * @return
 */
public function invokeServiceGetTestListTeacher($userName, $language) {
	$systemIdentifier = $this->config->getSystemIdentifier();
	$params = array('userName'=>$userName, 
				'systemIdentifier'=>$systemIdentifier,
				'language'=>$language);
	$result = IntegrationHelper::run_service($this->config->getUrlSietteService(), 
			SERVICE_GET_TEST_LIST_TEACHER, $params); 
	
	return $result;
}

/**
 * This method invokes the web service that gives the list of available 
 * tests. 
 * 
 * @param $userName
 * @param $language
 * @return
 * @throws Exception
 */
public function invokeServiceGetTestListStudent($userName, $language) {
	$systemIdentifier = $this->config->getSystemIdentifier();
	$params = array('userName'=>$userName, 
				'systemIdentifier'=>$systemIdentifier,
				'language'=>$language);
	
	$result = IntegrationHelper::run_service($this->config->getUrlSietteService(), 
			SERVICE_GET_TEST_LIST_STUDENT, $params); 
	
	return $result;
}

/**
 * This method invokes the web service that check if an user exists.
 * 
 * @param userName
 * @return
 * @throws Exception
 */
public function invokeServiceCheckExitsUser($userName) {
	$systemIdentifier = $this->config->getSystemIdentifier();
	$params = array('userName'=>$userName, 
				'systemIdentifier'=>$systemIdentifier);
	$result = IntegrationHelper::run_service($this->config->getUrlSietteService(), 
			SERVICE_CHECK_USER, $params);
	
	return $result;
}

/**
 * This method invokes the web service to register an user.
 * 
 * @param userData
 * @param rsaSha1Signature
 * @return
 */
public function invokeServiceRegisterUser($userDataInformation, $rsaSha1Signature) {
	$userName = $userDataInformation->getUserName();
	$firstName = $userDataInformation->getFirstName();
	$lastName = $userDataInformation->getLastName(); 
	$systemIdentifier = $this->config->getSystemIdentifier();
	$isTeacher = $userDataInformation->getIsTeacher();
	
	$userData = array('userName'=>$userName,
	 		'firstName'=>$firstName, 'lastName'=>$lastName,
			'systemIdentifier'=>$systemIdentifier, 
			'isTeacher' => $isTeacher);
	$params = array('userData'=>$userData, 
			'rsaSha1Signature'=>$rsaSha1Signature);
	$result = IntegrationHelper::run_service($this->config->getUrlSietteService(), 
			SERVICE_REGISTER_USER, $params);
	
	return $result;
}


/**
 * This method invokes the web service to authenticate an user from
 * an external system.
 * 
 * @param userName
 * @param rsaSha1Signature
 * @return
 * @throws Exception
 */
public function invokeServiceAuthenticateUser($userName, $rsaSha1Signature) {
	$systemIdentifier = $this->config->getSystemIdentifier();
	$params = array('userName'=>$userName, 
		'systemIdentifier'=>$systemIdentifier, 
		'rsaSha1Signature'=>$rsaSha1Signature);
	$result = IntegrationHelper::run_service($this->config->getUrlSietteService(), 
		SERVICE_AUTHENTICATE_USER, $params);
	
	 return $result;
}

/**
 * This method invokes the web service to begin a session test.
 * 
 * @param idTest
 * @param userName
 * @param remoteAddr  IP address that request the test
 * @param rsaSha1Signature
 * @return
 * @throws Exception
 */
public function invokeServiceBeginTestSession($idTest, $colaborativeMode, 
		$userName, $rsaSha1Signature, $remoteAddr) {
	
	$systemIdentifier = $this->config->getSystemIdentifier();
	$idtestnum = 0+$idTest;//Conversion a entero
	
	$privKeyFile = $this->config->getPrivateKeyFile();
	$signature = $this->sign_string($userName . $systemIdentifier, $privKeyFile);
	
	$params = array('idTest'=>$idtestnum, 'colaborative'=>$colaborativeMode,  
			'hostAddress'=>$remoteAddr,	'userName'=>$userName, 
			'systemIdentifier'=>$systemIdentifier, 
			'rsaSha1Signature'=>$rsaSha1Signature);
	$result = IntegrationHelper::run_service($this->config->getUrlSietteService(), 
			SERVICE_BEGIN_TEST_SESSION, $params);
	
	return $result;
}

/**
 * This method invokes the web service to begin a session test.
 * 
 * @param idsession
 * @return
 */
public function invokeServiceGetScore($idsession) {
	$sessionnum = $idsession+0;//Conversion String -> int

	$params = array('idsession'=>$sessionnum);
	$gradevalue = IntegrationHelper::run_service($this->config->getUrlSietteService(), 
		SERVICE_GET_SCORE, $params);

	return $gradevalue;
}
	
//////////////////////////////All steps in only one method:

/**
 * Generate an URL from SIETTE wich can be invoqued to start a test.
 * Internally this method invoques all necessary Web Services
 * 
 * @param userId
 * @param userFirstName
 * @param userLastName
 * @return The URL of SIETTE than can be used to start a test
 */
public function startTest($userData, $sietteTestID, $colaborative, $language,
		$urlEndTestBack, $remoteAddr) {
	
	if (!$this->checkUserStep($userData)){
		$this->registerUserStep($userData);
	}
	$this->token = $this->authenticateUserStep($userData->getUserName());
	$this->sietteSession = $this->getSietteSessionStep($userData->getUserName(), 
			$colaborative, $sietteTestID,  $remoteAddr);
	return $this->getStartTestURL($this->sietteSession, $this->token, $language,
			$urlEndTestBack);
}

/**
 * This method checks if an user exists in SIETTE
 * 
 * @param userId
 * @param userFirstName
 * @param userLastName
 * @return True if the user exists, else, it returns false
 * @throws Exception 
 */
public function checkUserStep($userData) {
	$result = $this->invokeServiceCheckExitsUser($userData->getUserName());

	$exists = false;
	if (isset($result) && $result){
		//this user already exists;
		$exists = true;
	}else if (isset($result)){
		//this user doesn't exists, therefore it is necessary to 
		//register it in SIETTE
	}else{
		//There was some error, try again.
		throw new Exception(
					"The result obtained by the Web service is a null value");
	}
	return $exists;
}

/**
 * This method registers an user in SIETTE if not exists
 * 
 * @param userId
 * @param userFirstName
 * @param userLastName
 * @throws Exception
 */
public function registerUserStep($userData) {
	$stringToSign = $userData->getUserName() .
		$this->config->getSystemIdentifier();
	$privKeyFile = $this->config->getPrivateKeyFile();
	$resultEncoded = $this->sign_string($stringToSign, $privKeyFile);
	
	//Service invocation
	$result = $this->invokeServiceRegisterUser($userData, $resultEncoded);

	if (isset($result) && $result){
		//The user has been registered
	}else{
		throw new Exception(
			"The result obtained by the Web service is a null value");
	}
}

/**
 * This method gets a token from SIETTE by authenticating the user
 * 
 * @param userId
 * @return
 * @throws Exception
 */
public function authenticateUserStep($userId) {
	$stringToSign = $userId . $this->config->getSystemIdentifier();
	$privKeyFile = $this->config->getPrivateKeyFile();
	$resultEncoded = $this->sign_string($stringToSign, $privKeyFile);
	
	//Service invocation
	$result = $this->invokeServiceAuthenticateUser($userId, $resultEncoded);
	if (!isset($result)){
		throw new Exception(
				"The user can not be authenticated, there was some error");
	}
	return $result;
}

/**
 * This method gets a SIETTE session to start a test
 * 
 * @param userId
 * @return
 * @throws Exception
 */
public function getSietteSessionStep($userId, $colaborative,
		$sietteTestID, $remoteAddr) {
	$stringToSign = $userId . $this->config->getSystemIdentifier();
	$privKeyFile = $this->config->getPrivateKeyFile();
	$resultEncoded = $this->sign_string($stringToSign, $privKeyFile);
	
	//Service invocation
	$result = $this->invokeServiceBeginTestSession($sietteTestID, $colaborative, 
			$userId, $resultEncoded, $remoteAddr);
	if (!isset($result)){
		throw new Exception(
				"The session can not be started, there was some error");
	}
	
	return $result;
}

/**
 * This method gets the cualification of a SIETTE test given a session
 * identifier
 * 
 * @param sietteSession
 * @return
 * @throws Exception
 */
public function getSietteScore($sietteSession) {
	$result = $this->invokeServiceGetScore($sietteSession);

	if (!isset($result)){
		throw new Exception(
			"The score can not be obtained, there was some error");
	}
	return $result;
}

/**
 * This method gets the URL from SIETTE where the report related to a
 * test session can be consulted
 * 
 * @param idSession Previously obtained session from SIETTE
 * @param idTest Identification of the test done in SIETTE
 * @param auth Previously obtained token from SIETTE
 * @param colaborative
 * @param language
 * @param urlSIETTE URL where SIETTE is located
 * @return
 * @throws Exception
 */
public function getSietteReportURL($idSession,$idTest, $auth, 
		$colaborative, $language, $urlSIETTE) {
	$colaborativeValue = 0;
	if (isset($colaborative) && $colaborative){
		$colaborativeValue = 1;
	}
	$url = $this->config->getUrlSiette().
			"/" . "external/student/viewTestSession" .
			"?idsession=" . $idSession .
			"&idtest=" . $idTest .
			"&colaborative=" . $colaborativeValue .
			"&idioma=" . $language .
			"&auth=" . $auth;

	return $url;
}

/**
 * This function executes a web service. The errors report is not locking since
 * it uses the echo function.
 * 
 * @param string $url Web service URL
 * @param string $method Web service method to run
 * @param array $params Params Params of the method
 * @return mixed Result of the execution of the Web service 
 **/
public static function run_service ($url,$method,$params) {
	echo "<font color='blue'>&lt;Invoking service <i>" . $method . "</i>...&gt;</font>";
	$error = false;
	$client = new nusoap_client($url, false, false, false, false, false, 30, 30);
	$err = $client->getError();
	if ($err) {
		$err = print_r($err,true);
		throw new Exception("Errror creating service: " . $err . "<br>");
		$result = null;
	}else{
		$result = $client->call($method, $params);
		if ($client->fault) {
			$result = print_r($result,true);
			throw new Exception("Conectivity error : ". $result . "<br>");
			$result = null;
		} else {
			$err = $client->getError();
			if ($err) {
				$err = print_r($err,true);
				throw new Exception("Conectivity error: " . $err . "<br>");
				$result = null;
			}
		}
	}
	
	return $result;
}

public static function get_optional_param($parname, $default=NULL) {

	if (isset($_POST[$parname])) {       // POST has precedence
		$param = $_POST[$parname];
	} else if (isset($_GET[$parname])) {
		$param = $_GET[$parname];
	} else {
		return $default;
	}
	
	if (is_numeric($param)) {
		return $param;
	}
	$param = stripslashes($param);   // Needed for kses to work fine
	return addslashes($param); 
}
}
?>
