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

$subject = "[Ȩ����������]".$form_title;
$from = $from_email;
$bodytext = "<br />�̸� :".$from_name;
$bodytext .= "<br />����ó :".$from_phone;
$bodytext .= "<br />�̸��� :".$from_email."<br />";
$bodytext .= stripslashes($from_content). "\r\n\r\n";

$mailheaders  = 'MIME-Version: 1.0' . "\r\n";
$mailheaders .= 'Content-type: text/html; charset=euc-kr' . "\r\n";
$mailheaders .= "Return-Path: $from\r\n";
$mailheaders .= "From: $from \r\n";
$mailheaders .= "Cc: $toboss \r\n";
$mailheaders .= "Content-Type: text/html; charset=euc-kr \r\n\r\n\r\n";

mail($test,$subject,$bodytext,$mailheaders);

echo "<script language='JavaScript'>alert('���Ϲ߼��� �Ϸ�Ǿ����ϴ�.');</script>";
echo "<script>location.href='/'</script>\n";
exit;
?>