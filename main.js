import { detecType, setStorage ,detecIcon } from "./helpers.js";

//htmlden alınan 
const form = document.querySelector("form");
const list = document.querySelector("ul");
console.log(list);



//olay izleyicileri
form.addEventListener("submit", handleSubmit);
list.addEventListener("click", handleClick);


//ortak kullanım alanı 
var map;
var notes = JSON.parse(localStorage.getItem("notes")) || [];
var coords = [];
var layerGroup = [];



navigator.geolocation.getCurrentPosition(loadMap);




// Haritaya tıklanınca kordinatları gösterir
function onMapClick(e) {
    form.style.display = "flex";
    coords = [e.latlng.lat, e.latlng.lng]
    // console.log(coords);


}


//kullanıcının konumuna göre ekrana haritayı getirme
function loadMap(e) {
    // console.log(e);

    //harita kurulumu
    map = new L.map('map').setView([e.coords.latitude, e.coords.longitude], 13);
    L.control;
    //haritanın nasıl gözükeceğini belirler
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    
    //haritaya imleçleri tutacağımız katman
    layerGroup = L.layerGroup().addTo(map);
    
    // localden gelen veriler
    renderNoteList(notes)
    
    //tıklama olunca çalışacak fonksiyon(form)
    map.on("click", onMapClick)
}


function renderMarker(item) {
   //marker oluşturur
    L.marker(item.coords, {icon: detecIcon(item.status)})
    //imle. katmanını ekler
    .addTo(layerGroup)
    //tiklanınca popup açma
    .bindPopup(`${item.desc}`);

}

//formun gönderilme olayında çalışır
function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const desc = e.target[0].value;
    if (!desc) return;
    const date = e.target[1].value;
    const status = e.target[2].value;
    // notes dizisine eleman ekleme
    notes.push({ id: new Date().getTime(), desc, date, status, coords });
    console.log(notes);

    //local storage güncelleme
    setStorage(notes);
    renderNoteList(notes);
    //form kapama
    form.style.display="none";
}

// ekrana verileri basma
function renderNoteList(item) {
    //notlar alanını temizler
    list.innerHTML = "";

    //markerları temizleme
    layerGroup.clearLayers();


    item.forEach((item) => {
        const listElement = document.createElement("li");
        listElement.dataset.id = item.id;
        listElement.innerHTML = `
       <div>
            <p>${item.desc}</p>
            <p><span>Tarih:</span> ${item.date}</p>
            <p><span>Durum:</span> ${detecType(item.status)}</p>

            <i class="bi bi-x" id="delete"></i>
            <i class="bi bi-airplane" id="fly"></i>
        </div>`;
        list.insertAdjacentElement("afterbegin" ,listElement);
        renderMarker(item);
    });


}
function handleClick(e){
    //eleman id öğrenem
    const id = e.target.parentElement.parentElement.dataset.id;
    console.log(e.target.id)

    if(e.target.id === "delete"){
    //id'sini bildiğimiz elemanı kaldırma
     notes = notes.filter((note) => note.id != id);
     //localde güncelleme
     setStorage(notes);
     //ekranı güncelleme
     renderNoteList(notes);
    }
    if(e.target.id === "fly"){
    const note = notes.find((note) => note.id == id);
    map.flyTo(note.coords);

    }
};




