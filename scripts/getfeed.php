<?php

header('Content-Type: text/json');

if (empty($_GET["token"])) {
	header('HTTP/1.0 400 Bad Request');
    echo '{ "error": "400 Bad Request" }';
    exit();
}

if ($_GET["mock"] == "true") {
	echo file_get_contents("../mocks/response-export.json");
	exit();
}

$ws_url = "https://api.wizbii.com/v2/dashboard/?direction=newest";
$ch = curl_init($ws_url);

curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: Bearer " . $_GET["token"]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);
curl_close($ch);

echo $result;

