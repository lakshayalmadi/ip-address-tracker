const API_KEY = "at_DyfVD6rtsipdTDP7cipl1wmoGyvcT&ipAddress=8.8.8.8";
const API_LINK = 'https://geo.ipify.org/api/'
let current_version = 'v1'


let current_ip = document.getElementById('current_ip');
let current_location = document.getElementById('current_location');
let current_timezone = document.getElementById('current_timezone');
let current_isp = document.getElementById('current_isp');

const entered_ip = document.getElementById('ip_address');
const submit_btn = document.getElementById('submit_btn');

const headers_option = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

const map = L.map('display-map', {
    'center': [0,0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
});

var updateMarker = (update_marker = [18, 18]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
};

var getIpDetails = (default_ip)=>{
    if(default_ip == undefined){
        var ip_url= `${API_LINK}${current_verion}?apikey=${API_KEY}`
    }
    else{
        var ip_url = `${API_LINK}${current_version}?apikey=${API_KEY}&ipAddress=${default_ip}`
    }

    fetch(ip_url, headers_option)
    .then(results => results.json())
    .then(data => {
        current_ip.innerHTML = data.ip
        current_location.innerHTML = data.location.city+" "+data.location.country+" "+data.location.postalCode
        current_timezone.innerHTML = data.location.timezone
        current_isp.innerHTML = data.isp

        updateMarker([data.location.lat, data.location.lng])

    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    })
}

document.addEventListener('load', updateMarker())

submit_btn.addEventListener('click', e =>{
    e.preventDefault()
    if(entered_ip.value != '' && entered_ip.value != null){
        getIpDetails(entered_ip.value)
        return
    }
    alert('Please enter a valid IP address');
});