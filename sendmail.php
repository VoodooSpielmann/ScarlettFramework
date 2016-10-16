<?php 
if((isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['phone'])&&$_POST['phone']!="")){
  $to = array('vspiel@ya.ru');
  $subject = 'Обратный звонок';
  $message = 'Имя: '.$_POST['name'].'<br>Телефон: '.$_POST['phone'];
  $headers  = "Content-type: text/html; charset=utf-8 \r\n";
  $headers .= "From: <vspiel@yandex.ru>\r\n"."Reply-To: vspiel@yandex.ru"."\r\n"."X-Mailer: PHP/" . phpversion();
  foreach ($to as $val)
  {
    mail($val, $subject, $message, $headers);
  }
}
?>