import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {MapsAPILoader} from "@agm/core";
let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  title = 'Quick Movers';
  // lat = 51.678418;
  // lng = 7.809007;
  public lat = 24.799448;
  public lng = 120.979021;

  public origin: any;
  public destination: any;
  markers: marker[] = [];
  public latitude: any;
  provideRouteAlternatives = true;
  public travelMode: any = 'DRIVING' // default: 'DRIVING'
  longitude: any;
  zoom: any;
  address: any;
  private geoCoder: any;
  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map | undefined;

  public markerOptions = {
    origin: {
      infoWindow: 'This is origin.',
      icon: 'https://www.shareicon.net/data/32x32/2016/04/28/756617_face_512x512.png',
      draggable: true,
    },
    destination: {
      icon: 'https://www.shareicon.net/data/32x32/2016/04/28/756617_face_512x512.png',
      label: 'marker label',
      opacity: 0.8,
    },
  };
  public renderOptions = {
    suppressMarkers: false,
  }

    constructor(private mapsAPILoader: MapsAPILoader,
                    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }



  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        // this.origin = {lat : this.lat, lng: this.lng}
        // this.getAddress(this.latitude, this.longitude);
        this.lat = this.latitude;
        this.lng = this.longitude;
        this.markers.push({
          lat: this.lat,
          lng: this.lng,
          draggable: true,
          label: 'origin'
        });
        this.origin = {lat : this.lat, lng: this.lng}
      });
    }
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: { formatted_address: any; }[], status: string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  mapsLocation() {
    console.log("clicked");
  }
  getDirection() {
    // this.origin = { lat: 24.799448, lng: 120.979021 };
    // this.destination = { lat: 24.799524, lng: 120.975017 };

    // Location within a string
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }
  mapClicked($event: any) {
      if (this.markers.length < 2) {
        this.markers.push({
          lat: $event.coords.lat,
          lng: $event.coords.lng,
          draggable: true,
          label: 'destination'
        });
        // if (this.markers.length == 1) {
        //   this.origin = {lat : $event.coords.lat, lng: $event.coords.lng}
        // }
        if (this.markers.length == 2) {
          this.destination = {lat : $event.coords.lat, lng: $event.coords.lng}
          console.log(this.origin)
          console.log(this.destination)
          this.markers = [];
          // this.getDirection();
        }
      }

  }

}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label: string;
  draggable: boolean;
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
