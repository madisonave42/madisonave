<?
$from_email = $_POST[email];
$from_name = iconv('utf-8', 'euc-kr', $_POST[name]); 
$form_title = iconv('utf-8', 'euc-kr', $_POST[subject]);
$from_phone = iconv('utf-8', 'euc-kr', $_POST[phone]);
$from_content = iconv('utf-8', 'euc-kr', $_POST[content]);

$to = "bscho@madisonave.co.kr";
//$toboss = "one@madisonave.co.kr";
$toboss = "burning5@madisonave.co.kr";
$test = "ministori@madisonave.co.kr";

$subject = "[Madison Avenue Website] ".$form_title;
$from = $from_email;
//$bodytext = "<br />이름 :".$from_name;
//$bodytext .= "<br />연락처 :".$from_phone;
//$bodytext .= "<br />이메일 :".$from_email."<br />";
//$bodytext .= $from_content;
$content = str_replace("\n", "<br />", $from_content);
//$bodytext .= $content;

$bodytext = '
<table style="width:700px; border-collapse:collapse;" cellpadding="0" cellspacing="0">
	<thead>
		<tr>
			<th>
				<img src="http://www.madisonave.co.kr/images/mail_header.png" style="display:block;" />
			</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td style="padding:0 28px 30px; background:#192322;">
				<table style="width:644px; border-collapse:collapse; color:#01e1bf; font-family:"돋움", sans-serif; font-size:13px;" cellpadding="0" cellspacing="0" >
					<colgroup>
						<col style="width:70px;" />
						<col style="width:auto" />
						<col style="width:70px;" />
						<col style="width:auto;" />
					</colgroup>
					<tbody>
						<tr>
							<td colspan="4">
								<img src="http://www.madisonave.co.kr/images/blank.png" />
							</td>
						</tr>
						<tr>
							<td>
								<img src="http://www.madisonave.co.kr/images/name.png" />
							</td>
							<td style="padding:5px 0 0 0; color:#01e1bf; font-family:dotum, sans-serif; font-size:13px;">
								'. $from_name .'
							</td>
							<td>
								<img src="http://www.madisonave.co.kr/images/email.png" />
							</td>
							<td style="padding:5px 0 0 0; color:#01e1bf; font-family:dotum, sans-serif; font-size:13px;">
								'. $from_email .'
							</td>
						</tr>
						<tr>
							<td colspan="4">
								<img src="http://www.madisonave.co.kr/images/blank.png" />
							</td>
						</tr>
						<tr>
							<td>
								<img src="http://www.madisonave.co.kr/images/phone.png" />
							</td>
							<td style="padding:5px 0 0 0; color:#01e1bf; font-family:dotum, sans-serif; font-size:13px;">
								'. $from_phone .'
							</td>
							<td>
								<img src="http://www.madisonave.co.kr/images/title.png" />
							</td>
							<td style="padding:5px 0 0 0; color:#01e1bf; font-family:dotum, sans-serif; font-size:13px;">
								'. $form_title .'
							</td>
						</tr>
						<tr>
							<td colspan="4">
								<img src="http://www.madisonave.co.kr/images/blank.png" />
							</td>
						</tr>
						<tr>
							<td style="padding-bottom:10px;">
								<img src="http://www.madisonave.co.kr/images/content.png" />
							</td>
							<td colspan="3" style="background:#192322;"> </td>
						</tr>
						<tr>
							<td colspan="4" style="padding:20px; text-align:justify; line-height:1.6; color:#01e1bf; font-family:dotum, sans-serif; font-size:13px;">
								'. $content .'
							</td>
						</tr>
					</tbody>
				</table>
			</td>
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

mail($test,$subject,$bodytext,$mailheaders);

echo "<style>body{background:#000}</style>";
echo "<script language='JavaScript'>alert('메일발송이 완료되었습니다. 첫 화면으로 이동합니다.');</script>";
echo "<script>location.href='/'</script>\n";
exit;
?>