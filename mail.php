<?
$from_email = $_POST[email];
$from_name = iconv('utf-8', 'euc-kr', $_POST[name]); 
$form_title = iconv('utf-8', 'euc-kr', $_POST[subject]);
$from_phone = iconv('utf-8', 'euc-kr', $_POST[phone]);
$from_content = iconv('utf-8', 'euc-kr', $_POST[content]);

$to = "bscho@madisonave.co.kr";
//$toboss = "one@madisonave.co.kr";
$toboss = "ministori@madisonave.co.kr";
$test = "ministori@madisonave.co.kr";

$subject = "[홈페이지제안]".$form_title;
$from = $from_email;
$bodytext = "<br />이름 :".$from_name;
$bodytext .= "<br />연락처 :".$from_phone;
$bodytext .= "<br />이메일 :".$from_email."<br />";
$bodytext .= stripslashes($from_content). "\r\n\r\n";

$mailheaders  = 'MIME-Version: 1.0' . "\r\n";
$mailheaders .= 'Content-type: text/html; charset=euc-kr' . "\r\n";
$mailheaders .= "Return-Path: $from\r\n";
$mailheaders .= "From: $from \r\n";
$mailheaders .= "Cc: $toboss \r\n";
$mailheaders .= "Content-Type: text/html; charset=euc-kr \r\n\r\n\r\n";

mail($test,$subject,$bodytext,$mailheaders);

echo "<script language='JavaScript'>alert('메일발송이 완료되었습니다.');</script>";
echo "<script>location.href='/'</script>\n";
exit;
?>