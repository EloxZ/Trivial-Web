<?php

    const DEFAULT_USER_DATATYPE_STUDENT = false;
	
class UserData {
	var $firstName;
	var $lastName;
	var $userName;
	var $isTeacher = DEFAULT_USER_DATATYPE_STUDENT;
	var $systemIdentifier;

/**
 * Gets the user&apos; firstname
 * @return <p>the user&apos;s firstname</p>
 */
public function getFirstName() {
    return $this->firstName;
}

/**
 * Gets the user&apos; lastname
 * @return <p>the user&apos;s lastname</p>
 */
public function getLastName() {
    return $this->lastName;
}

/**
 * Gets the user&apos; username
 * @return <p>the user&apos;s username</p>
 */
public function getUserName() {
    return $this->userName;
}

/**
 * Gets the user&apos;s data type (Student | Teacher)
 * @return <ul><li>True, in case the given UserData corresponds to a 
 * Teacher</li><li>False otherwise</li></ul>
 */
public function getIsTeacher() {
    return $this->isTeacher;
}

/**
 * Gets the user&apos; systemIdentifier
 * @return <p>the user&apos;s firstname</p>
 */
public function getSystemIdentifier() {
    return $this->systemIdentifier;
}

/**
 * Sets the user&apos;s first name
 * @param firstName <p>the new user&apos;s first name</p>
 */
public function setFirstName($firstName) {
    $this->firstName = $firstName;
}

/**
 * Sets the user&apos;s data type ( Student | Teacher )
 * @param isTeacher <ul><li>True, in case the new user is a Teacher</li>
 * <li>False, the new user is a Student</li></ul>
 */
public function setIsTeacher($isTeacher) {
    $this->isTeacher = $isTeacher;
}

/**
 * Sets the new user&apos;s last name
 * @param lastName <p>the new user&apos;s last name</p>
 */
public function setLastName($lastName) {
    $this->lastName = $lastName;
}

/**
 * Sets the new user&apos;s user name
 * @param userName <p>the new user&apos;s user name</p>
 */
public function setUserName($userName) {
    $this->userName = $userName;
}


/**
 * Sets the user&apos; systemIdentifier
 * @return <p>the user&apos;s firstname</p>
 */
public function SetSystemIdentifier($systemIdentifier) {
    $this->systemIdentifier = $systemIdentifier;
}
	
}
?>