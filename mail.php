<?
$from_email = $_POST[email];
$from_name = iconv('utf-8', 'euc-kr', $_POST[name]); 
$form_title = iconv('utf-8', 'euc-kr', $_POST[subject]);
$from_phone = iconv('utf-8', 'euc-kr', $_POST[phone]);
$from_content = iconv('utf-8', 'euc-kr', $_POST[content]);

// main reciever
$to = "bscho@madisonave.co.kr";
$toboss = "one@madisonave.co.kr";

// test
//$to     = "ministori@madisonave.co.kr";
//$toboss = "ministori@madisonave.co.kr";

$subject = "[Madison Avenue] ".$form_title;
$from = $from_email;
$content = str_replace("\n", "<br />", $from_content);

$bodytext = '
<table style="width:644px; border-collapse:collapse; border:1px solid #999; font-family:dotum, sans-serif; font-size:13px;" cellpadding="0" cellspacing="0" >
	<colgroup>
		<col style="width:70px;" />
		<col style="width:auto" />
		<col style="width:70px;" />
		<col style="width:auto;" />
	</colgroup>
	<tbody>
		<tr>
			<td colspan="4" style="height:30px;">
			</td>
		</tr>
		<tr>
			<td style="padding:0 0 0 20px;">
				Name
			</td>
			<td>
				'. $from_name .'
			</td>
			<td style="padding:0 0 0 20px;">
				Email
			</td>
			<td>
				'. $from_email .'
			</td>
		</tr>
		<tr>
			<td colspan="4" style="height:30px;">
			</td>
		</tr>
		<tr>
			<td style="padding:0 0 0 20px;">
				Phone
			</td>
			<td>
				'. $from_phone .'
			</td>
			<td style="padding:0 0 0 20px;">
				title
			</td>
			<td>
				'. $form_title .'
			</td>
		</tr>
		<tr>
			<td colspan="4" style="height:30px;">
			</td>
		</tr>
		<tr>
			<td style="padding:0 0 10px 20px;">
				content
			</td>
			<td colspan="3"> </td>
		</tr>
		<tr>
			<td colspan="4" style="padding:10px 40px 30px; text-align:justify; line-height:1.6;">
				'. $content .'
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