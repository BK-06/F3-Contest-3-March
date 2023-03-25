"use strict";
var x = document.getElementById("map");
var b1 = document.getElementById("btnGetLocation");
var b2 = document.getElementById("btnRemoveLocation");

let isSupported = true;
let isLoaded = false;

const load = () => {
  b1.disabled = false;
  b2.disabled = true;
  const latitude = localStorage.getItem("lat");
  const longitude = localStorage.getItem("long");
  if (latitude && longitude) {
    isLoaded = true;
    b1.disabled = true;
    b2.disabled = false;
    showPosition(latitude, longitude);
  } else {
    x.innerHTML = "";
  }
};

window.onload = load;

function getLocation() {
  if (navigator.geolocation) {
    isLoaded = true;
    navigator.geolocation.getCurrentPosition(setPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function removeLocation() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  isLoaded = false;
  load();
}

function setPosition(position) {
  const { latitude, longitude } = (position || {}).coords || {};
  console.log(latitude, longitude);
  localStorage.setItem("lat", latitude);
  localStorage.setItem("long", longitude);
  load();
  //   x.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
}

let showPosition = (latitude, longitude) => {
  let frame = `<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>
  `;

  /**
   * 16.9890648 82.2474648
   * https://maps.google.com/maps?q=16.9890648,82.2474648&z=15
   */
  x.innerHTML = frame;
};
