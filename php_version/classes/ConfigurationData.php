<?php

    const SIETTE_SERVICE = "/services/External";
    const START_TEST = "/external/student/siette";
    const DEFAULT_SIETTE_URL = "https://www.siette.org/siette";
	
		
class ConfigurationData {
	var $systemIdentifier;
	var $urlSiette;
	var $urlSietteService;
	var $urlStartTest;
	var $privateKeyFile;

	function __construct(){
		$this->setUrlSiette(DEFAULT_SIETTE_URL);
	}

	public function getSystemIdentifier() {
		return $this->systemIdentifier;
	}
	
	public function setSystemIdentifier($systemIdentifier) {
		$this->systemIdentifier = $systemIdentifier;
	}
	
	public function getUrlSiette() {
		return $this->urlSiette;
	}
	
	public function setUrlSiette($urlSiette) {
		$this->urlSiette = $urlSiette;
		$this->setUrlSietteService($urlSiette . SIETTE_SERVICE);
		$this->setUrlStartTest($urlSiette . START_TEST);
	}
	
	public function getUrlSietteService() {
		return $this->urlSietteService;
	}
	
	public function setUrlSietteService($urlSietteService) {
		$this->urlSietteService = $urlSietteService;
	}
	
	public function getUrlStartTest() {
		return $this->urlStartTest;
	}
	
	public function setUrlStartTest($urlStartTest) {
		$this->urlStartTest = $urlStartTest;
	}

	public function getPrivateKeyFile() {
		return $this->privateKeyFile;
	}

	public function setPrivateKeyFile($privateKeyFile) {
		$this->privateKeyFile = $privateKeyFile;
	}
}
?>