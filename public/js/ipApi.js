//ip-api
let url = new URL(document.getElementById('url').value);
let map = document.getElementById('map')
fetch('http://ip-api.com/json/' + url.host)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('apiQuery').textContent = data.query
    if (data.status == 'fail') return
    map.src = 'https://embed.waze.com/iframe?zoom=10&lat=' + data.lat + '&lon=' + data.lon
    document.getElementById('apiStatus').textContent = data.status
    document.getElementById('apiCountry').textContent = data.country
    document.getElementById('apiCountryCode').textContent = '(' + data.countryCode + ')'
    document.getElementById('apiRegion').textContent = data.region
    document.getElementById('apiRegionName').textContent = data.regionName
    document.getElementById('apiCity').textContent = data.city
    document.getElementById('apiZip').textContent = data.zip
    document.getElementById('apiLat').textContent = data.lat
    document.getElementById('apiLon').textContent = data.lon
    document.getElementById('apiTimezone').textContent = data.timezone
    document.getElementById('apiIsp').textContent = data.isp
    document.getElementById('apiOrg').textContent = data.org
    document.getElementById('apiAs').textContent = data.as
  })