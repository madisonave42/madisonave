<?
$from_email = $_POST[email];
$from_name = iconv('utf-8', 'euc-kr', $_POST[name]); 
$form_title = iconv('utf-8', 'euc-kr', $_POST[subject]);
$from_phone = iconv('utf-8', 'euc-kr', $_POST[phone]);
$from_content = iconv('utf-8', 'euc-kr', $_POST[content]);

// test
$to     = "all@madisonave.co.kr";
$toboss = "all@madisonave.co.kr";

$subject = "[Madison Avenue] ".$form_title;
$from = $from_email;
$content = str_replace("\n", "<br />", $from_content);

$bodytext = '
<table style="width:700px; border-collapse:collapse;" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<th>
				<img src="http://www.madisonave.co.kr/images/mail_form.png" style="display:block;" />
			</th>
		</tr>
	</tbody>
</table>
';
$mailheaders  = 'MIME-Version: 1.0' . "\r\n";
$mailheaders .= 'Content-type: text/html; charset=euc-kr' . "\r\n";
$mailheaders .= "Return-Path: $from\r\n";
$mailheaders .= "From: $from \r\n";
$mailheaders .= "Cc: $toboss \r\n";
$mailheaders .= "Content-Type: text/html; charset=euc-kr \r\n\r\n\r\n";

mail($to,$subject,$bodytext,$mailheaders);

echo "<style>body{background:#000}</style>";
echo "<script language='JavaScript'>alert('메일발송이 완료되었습니다. 첫 화면으로 이동합니다.');</script>";
echo "<script>location.href='/'</script>\n";
exit;
?>