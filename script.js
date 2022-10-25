window.addEventListener('load', () => {
let long;
let lat;

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
       console.log(position);
       long = position.coords.longitude;
       lat = position.coords.latitude; 

       const proxy = `https://cors-anywhere.herokuapp.com/`;
       const api = `${proxy}https://api.darksky.net/forecast/1dda89e902ce89b77ed2412eac3026d7/${lat},${long}`;
    

    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
    });
}
});