<?php
    if(!defined('AllowInclude')) {
        die('Direct access not permitted');
    }

    if (isset($_SESSION['user'])) {
        require_once($_SERVER['DOCUMENT_ROOT']."/php_version/classes/IntegrationHelper.php");
        require_once($_SERVER['DOCUMENT_ROOT']."/php_version/classes/ConfigurationData.php");
        require_once($_SERVER['DOCUMENT_ROOT']."/php_version/classes/UserData.php");

        $configurationData = new ConfigurationData();
        $configurationData->setSystemIdentifier("integrationdemo");
        $configurationData->setPrivateKeyFile($_SERVER['DOCUMENT_ROOT']."/php_version/security/demo_priv.pem");

        $integrationHelper = new IntegrationHelper($configurationData);

        $_SESSION['configurationData']=$configurationData;
        $_SESSION['integrationHelper']=$integrationHelper;

        $userData = new UserData();
        $userData->setFirstName(null);
        $userData->setLastName(null);
        $userData->setUserName($_SESSION['user']['nick']);
        $userData->setIsTeacher(true);
        $userData->setSystemIdentifier($configurationData->getSystemIdentifier());

        $_SESSION['userData']=$userData;

        try {
            //Service invocation
            $result = $integrationHelper->invokeServiceCheckExitsUser(
                $userData->getUserName());
            $stringToSign = $userData->getUserName() . $configurationData->getSystemIdentifier();
            $resultEncoded = $integrationHelper->sign_string($stringToSign);

            echo("The user <i>" . $userData->getUserName() .
                "</i> has been checked and ");
            if (isset($result) && $result){
                echo("this user <b>already exists</b>");
            }else if (isset($result)){
                echo("this user <b>doesn't exists,</b> therefore it is " .
                    "necessary to register it in SIETTE");

                echo("<br>Generated sign for " . $stringToSign .
                    " (Base 64): " . $resultEncoded . "<br>");

                //Service invocation
                $result2 = $integrationHelper->invokeServiceRegisterUser(
                    $userData, $resultEncoded);

                if (isset($result2) && $result2){
                    echo("The user <i>" . $userData->getUserName() .
                        "</i> has been registered");
                }else{
                    echo("<br><b>There was some error, try again.</b>");
                }
            }else{
                echo("<br><b>There was some error, try again.</b>");
            }

            $result3 = $integrationHelper->invokeServiceAuthenticateUser(
                $userData->getUserName(), $resultEncoded);

            if (isset($result3)){
                $token = urlencode($result3);
                echo("<br>The user has been authenticated and the " .
                    "credential obtained is:<br>" . $token . "<p> ");

                $_SESSION['token']=$token;
            }else{
                echo("<br><b>There was some error, try again.</b>");
            }

        }catch (Exception $e) {
            echo("Exception: " . $e->getMessage());
        }


    }