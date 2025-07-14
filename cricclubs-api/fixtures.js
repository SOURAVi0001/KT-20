const axios = require('axios');

async function fetchTeamPage() {
  try {
    const cookieHeader = `
__eoi=ID=1325ea941b24800a:T=1751034750:RT=1751672228:S=AA-AfjZC98U-yUPRceqJwbhu3bFK;
__gads=ID=5104b5de7813e374:T=1751034750:RT=1751672228:S=ALNI_MZWBkBV3YlHi9rkrYb5IPIkUM-z7A;
__gpi=UID=0000113ad88f3cbb:T=1751034750:RT=1751672228:S=ALNI_Mben0v6AeL8FeoiVEHn9JfceUEPag;
__qca=I0-60606544-1751034754777;
_awl=2.1751672147.5-d773a6d3919c7564e3c8c943b19e7235-6763652d617369612d6561737431-0;
_cc_id=bfffe5a0da4b642fd8bd01af37354516;
_fbp=fb.1.1751034749740.145319919374259941;
_ga=GA1.1.357761257.1751034749;
_ga_0QBXXTJSRK=GS2.1.s1751671563$o3$g1$t1751672230$j58$l0$h0;
_sharedID=4a5d83db-28fc-417a-aa25-c1b3495c2b55;
_sharedID_cst=zix7LPQsHA%3D%3D;
AWSALBTG=7AnlYCnTAnvxpZLaURRt0Zy+mqNAbAGc3MZw+G13Yt0TmrYbcHJigIOzW5TUV9MY45vAYJZqhZwUzejWU+8ho4hMvEQTOPS976IxtueHYRBqjgkTpyOGhvY5guCw72VWCyVnpdgnbzNhnxtGeFYr8Q9rqdqNGnbxgI/O/KpjEvQ6;
AWSALBTGCORS=7AnlYCnTAnvxpZLaURRt0Zy+mqNAbAGc3MZw+G13Yt0TmrYbcHJigIOzW5TUV9MY45vAYJZqhZwUzejWU+8ho4hMvEQTOPS976IxtueHYRBqjgkTpyOGhvY5guCw72VWCyVnpdgnbzNhnxtGeFYr8Q9rqdqNGnbxgI/O/KpjEvQ6;
cookiefy_cookie=true;
cto_bidid=3zfuYF9TcUpySUt4ZyUyQmk3bDYyTkhVTkU0Y3FQRFh0VTh4MGdUMGcwdU1KWlRCdkFjaGFzV2VEZmgwblVYaEtjcnhlYWhCZU95a29meWdhNDg3OXhPbkJ6N3ZRJTNEJTNE;
cto_bundle=fsDN_V80ZmwwaXdTVCUyQnc0M3JGc2NiJTJCbmt2alU2QSUyRjBTaExvQnBqNWhEQ0paTXhMMWpOeWZkWWFFR2NWcXFJQzRCanFaeGxuSnBBZVJXaFVLWjhYaHJQNWFYVGJNVXZXeXc4WDBXd1VtWVNYd0dhWXQzOTY0WkRITExVRkFhY2slMkJrU3pK;
JSESSIONID=893BF0E4552641B7B4B7479EF82F2FFA;
loggedInUserCoockie=gurjit0006@gmail.com;
panoramaId_expiry=1751758002277;
  `.trim().replace(/\n/g, ' '); // Clean formatting

    const response = await axios.get(
      'https://cricclubs.com/Komagatamaru/viewTeam.do?teamId=130&league=8&clubId=17793',
      {
        headers: {
          'Cookie': cookieHeader,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      }
    );

    console.log(response.data); // HTML of the page
  }
  catch (error) {
    console.error('Request failed:', error.response?.status, error.response?.statusText);
  }
}

fetchTeamPage();