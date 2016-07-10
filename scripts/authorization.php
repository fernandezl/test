<?php

$ws_url = "https://api.wizbii.com/v1/account/validate";
$ch = curl_init($ws_url);

curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/x-www-form-urlencoded"));
curl_setopt($ch, CURLOPT_POSTFIELDS, 'username=decouverte%40wizbii.com&password=decouvertewizbii&client_id=test&grant_type=password');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = json_decode(curl_exec($ch));
curl_close($ch);

return $result->{"access-token"};


