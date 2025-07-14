const axios = require('axios');

// Step 1: Login and get token
async function getFixtures() {
  try {
    const loginRes = await axios.post('https://core-prod-origin.cricclubs.com/core/user/login', {
      userName: 'Gurjit0006@gmail.com',
      password: '12345'
    });

    const token = loginRes.data.token;

    // Step 2: Fetch fixtures
    const fixturesRes = await axios.get('https://core-prod-origin.cricclubs.com/core/match/getSchedule', {
      headers: { 'X-Auth-Token': token },
      params: {
        clubId: 17793,
        limit: 50
      }
    });

    console.log(fixturesRes.data);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

getFixtures();