var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}});

/*Usage example*/
findIP.then(ip => $('.ip_locale').append('<i class="fas fa-location-arrow"></i> '+ip)).catch(e => console.error(e));
findIP.then(ip => $('.sqr--router').attr('href', 'http://'+ip.split('.')[0]+'.'+ip.split('.')[1]+'.'+ip.split('.')[2]+'.1')).catch(e => console.error(e));

//178.49.0.0/16   178.49.0.1 - 178.49.255.254

//37.192.0.0/14   37.192.0.1 - 37.195.255.254

//5.128.0.0/14    5.128.0.1 - 5.131.255.254

//172.16.0.0/12   172.16.0.1 - 172.31.255.254

$.get("https://ipinfo.io", function(response) {
  $('.ip_remote').append('<i class="fas fa-globe"></i> '+response.ip);
	let ip = response.ip;
	ip = ip.split('.');
	if (ip[0] === '178') {
		if (ip[1] === '49') {
			$('.test').attr('href', 'files/diag.exe');
			$('.test').text('diag.exe');
		}
	}
	if (ip[0] === '172') {
		if (ip[1] >= '16' && ip[1] <= '31') {
			$('.test').attr('href', 'files/diag.exe');
			$('.test').text('diag.exe');
		}
	}
	if (ip[0] === '37') {
		if (ip[1] >= '192' && ip[1] <= '195') {
			$('.test').attr('href', 'files/diag.exe');
			$('.test').text('diag.exe');
		}
	}
	if (ip[0] === '5') {
		if (ip[1] >= '128' && ip[1] <= '131') {
			$('.test').attr('href', 'files/diag.exe');
			$('.test').text('diag.exe');
		}
	}
}, "jsonp");
console.log(platform.toString());
console.log(platform.os.toString());
console.log(platform.os.family);
console.log(platform.name);

let os = platform.os.family;
let browser = platform.name;

if (browser === 'IE'){
	$('.browser').append('<i class="fab fa-internet-explorer"></i>'+' InternetExplorer');
}else if (browser === 'Microsoft Edge'){
	$('.browser').append('<i class="fab fa-edge"></i>'+' '+browser);
} else $('.browser').append('<i class="fab fa-'+browser.toLowerCase()+'"></i>'+' '+browser);
if (os === 'Windows' || os === 'Windows Server 2008 R2 / 7' || os === 'Windows Server 2008 / Vista' || os === 'Windows XP'){
	$('.sqr--help').attr('href','/files/win_help.exe');
	$('.os').append('<i class="fab fa-windows"></i>'+' '+os.split(' ',1)+' '+platform.os.version);
	$('.trobber').attr('style', 'display:none!important');
}else if (os === 'OS X'){
	$('.sqr--help').attr('href','/files/mac_help.dmg');
	$('.os').append('<i class="fab fa-apple"></i>'+' '+'Mac'+os);
	$('.test').attr('style', 'display:none;')
	$('.analyze').attr('href','#collapseMac');
	$('.analyze').attr('aria-controls','collapseMac');
	$('.trobber').attr('style', 'display:none!important');
} else if (os === 'Linux' || os === 'Debian' || os === 'Fedora' || os === 'Red Hat' || os === 'SuESe' || os === 'Ubuntu') {
	$('.sqr--help').attr('href','/files/lin_help.gz');
	$('.os').append('<i class="fab fa-linux"></i>'+' '+os);
	$('.test').attr('style', 'display:none;')
	$('.analyze').attr('href','#collapseLin');
	$('.analyze').attr('aria-controls','collapseLin');
	$('.trobber').attr('style', 'display:none!important');
} else $('.trobber_text').html('<p>Ваша операционная система не поддерживается</p><p>Нам жаль <i class="far fa-frown"></i></p>');

