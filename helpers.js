// tipi analiz edip ona göre fonksiyonun çağırıldığı yere açıklama gönderiri

export const detecType = (type) => { 
    switch (type) {
        case "park":
            return "Park Yeri "
        case "home":
            return " Ev "
        case "job":
            return " İş "
        case "goto":
            return " Ziyaret Edilecek "  

    }

 };


export const setStorage = (data) =>{
    //veriyi lokale göndermek
    const strData= JSON.stringify(data);
    //local güncelleme 
    localStorage.setItem("notes",strData);
};


var carIcon = L.icon({
    iconUrl: "car.png",
    iconSize: [30, 30],
  });
  
  var homeIcon = L.icon({
    iconUrl: "home-marker.png",
    iconSize: [30, 30],
  });
  
  var jobIcon = L.icon({
    iconUrl: "job.png",
    iconSize: [30, 30],
  });
  
  var visitIcon = L.icon({
    iconUrl: "visit.png",
    iconSize: [30, 30],
  });
  
  export function detecIcon(type) {
    console.log(type);
    switch (type) {
      case "park":
        return carIcon;
      case "home":
        return homeIcon;
      case "job":
        return jobIcon;
      case "goto":
        return visitIcon;
    }
  }

