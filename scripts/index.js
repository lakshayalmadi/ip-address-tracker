const API_KEY = "at_DyfVD6rtsipdTDP7cipl1wmoGyvcT&ipAddress=8.8.8.8";
const API_LINK = 'https://geo.ipify.org/api/'
let current_version = 'v1'

const map = L.map('display-map').setView([28.7041, 77.1025], 13);
L.control
	.zoom({
		position: "bottomleft",
	})
	.addTo(map);
L.tileLayer(
	"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFrc2hheTEyIiwiYSI6ImNrcGZrNmp3YjBrMWQyb280eTVzd2s2YWkifQ.zhCtx0Xz99dXY6Hw-FChhA",
	{
		attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: "mapbox/streets-v11",
		tileSize: 512,
		zoomOffset: -1,
		accessToken: "pk.eyJ1IjoibGFrc2hheTEyIiwiYSI6ImNrcGZrNmp3YjBrMWQyb280eTVzd2s2YWkifQ.zhCtx0Xz99dXY6Hw-FChhA",
	}
).addTo(map);


const form = document.querySelector('.input_container');
form.addEventListener("submit_btn", searchIP);

var givenIcon = L.icon({
	iconUrl: ".images/icon-location.svg",
	iconSize: [30],
	iconAnchor: [22, 94],
	popupAnchor: [-3, -76],
	shadowSize: [68, 95],
	shadowAnchor: [22, 94],
});

async function searchIP(e){
    e.preventDefault();
    const input = document.querySelector(".input_text");
    const searchButton = document.querySelector(".submit_btn");
    let ipAddress = input.value;

    if(ipAddress){
        const data = await fetch(
            `${API_LINK}${current_version}?apikey=${API_KEY}&ipAddress=${ipAddress}`
        )
        .then((res)=> res.json())
        .then((data)=>data);

        const latitude = data.location.lat;
        const longitude = data.location.lng;

        fixMap(latitude, longitude);
        setTimeout(fixDom(data), 1000);
    }else{
        searchButton.style.backgroundColor = "red"
        const searchBar = document.querySelector(".input_container");
		searchBar.style.animation = "0.1s linear .1s 3 alternate slidein";
		setTimeout(() => {
			searchButton.style.backgroundColor = "black";
			searchBar.style.animation = "none";
		}, 3000);
	}
	input.value = "";
}

function fixMap(la,lo){
    map.setView([la,lo], 13);
    L.marker([la,lo], {icon: givenIcon}).addTo(map);
}

function fixDom(data){
    
    const current_location = document.getElementById('current_location');
    const current_ip = document.getElementById('current_ip');
    const current_timezone = document.getElementById('current_timezone');
    const current_isp = document.getElementById('current_isp');

    current_ip.textContent= data.ip;
    current_location.textContent = data.location.city+" "+data.location.country+" "+data.location.postalCode;
    current_timezone.textContent = data.location.timezone;
    current_isp.textContent = data.isp;
}
