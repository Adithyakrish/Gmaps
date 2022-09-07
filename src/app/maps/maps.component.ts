import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {MapsAPILoader} from "@agm/core";
import {LocationService} from "../../services/location.service";
let map: google.maps.Map, infoWindow: google.maps.InfoWindow;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  title = 'Road Runner Driver App';
  // lat = 51.678418;
  // lng = 7.809007;
  public lat = 24.799448;
  public lng = 120.979021;

  public origin: any;
  public destination: any;
  markers: marker[] = [];
  public waypoints: any = [];
  public latitude: any;
  distance: any
  provideRouteAlternatives = true;
  public travelMode: any = 'DRIVING' // default: 'DRIVING'
  longitude: any;
  zoom: any;
  address: any;
  private geoCoder: any;
  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map | undefined;
  id: any;
  toggleButton = true;
  status = 'Enable';
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
                    private ngZone: NgZone, public locationService: LocationService) {

    }

  ngOnInit(): void {
    // setInterval(()=> {
      this.mapsAPILoader.load().then(() => {
        this.geoCoder = new google.maps.Geocoder;
        this.setCurrentLocation();
      });
    // },   5000);

  }
  toggle(event: any) {
   console.log(event);
   if (event.checked) {
    this.id = setInterval(()=> {
     this.mapsAPILoader.load().then(() => {
       this.geoCoder = new google.maps.Geocoder;
       this.setCurrentLocation();
     });
     },   5000);
   }
   else {
     clearInterval(this.id);
   }

  }



  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(this.latitude, 'this.latitude');
        console.log(this.longitude, 'this.longitude');
        this.zoom = 8;
        // this.origin = {lat : this.lat, lng: this.lng}
        // this.getAddress(this.latitude, this.longitude);
        // this.lat = this.latitude;
        // this.lng = this.longitude;
        // this.markers.push({
        //   lat: this.lat,
        //   lng: this.lng,
        //   draggable: true,
        //   label: 'origin'
        // });
        this.origin = {lat : this.lat, lng: this.lng}
          // let data = {
          //     "_id": "6314f49001258c733195f200",
          //     "currentLocation": {
          //         "type": "Point",
          //         "coordinates": [this.latitude, this.longitude]
          //     },
          //     "vin": "TN30BF3907",
          //     "insurancePolicyNumber": "AI02004002",
          //     "make": "BharatBenz",
          //     "model": "HDT T 4023T",
          //     "year": 2021,
          //     "ladenWeight": 3000,
          //     "weightUnit": "KG",
          //     "fuelInformation": {
          //         "fuelType": "DIESEL",
          //         "fuelCapacity": 120,
          //         "fuelUnit": "L",
          //         "mileage": 5,
          //         "mileageUnit": "KM",
          //         "currentFuelStat": 40
          //     },
          //     "capacity": 5,
          //     "kilometersRun": 15000,
          //     "tyres": 14,
          //     "color": "Blue",
          //     "materialType": "DRY",
          //     "driverId": "adithyakrish21@gmail.com",
          //     "_class": "com.vrp.vehicleservice.collections.Vehicle"
          // };
          // this.locationService.updateDriverLocation(data).subscribe(
          //     (successData) => {
          //         console.log(successData, 'successData');
          //     },
          //     (error) => {
          //         console.log(error, 'error');
          //     }
          // );
      });

    }
      this.markers = [];
      this.origin = { lat: 12.9900181, lng: 80.2165848 };
      this.destination = { lat: 10.9651497, lng: 78.0329381 };
      this.waypoints = [
          {location: { lat: 12.4080879, lng: 78.7247695 }},
          {location: { lat: 11.6692642, lng: 78.1101747 }},
          {location: { lat: 11.775541, lng: 77.7983797 }},
          {location: { lat: 10.6475225, lng: 76.9639036 }}
      ];

  }
  enableDisableRule() {
    this.toggleButton = !this.toggleButton;
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
      // if (this.markers.length < 11) {
      //   this.markers.push({
      //     lat: $event.coords.lat,
      //     lng: $event.coords.lng,
      //     draggable: true,
      //     label: 'destination'
      //   });
      //
      //
      //     if (this.markers.length == 1) {
      //         this.origin = {lat: $event.coords.lat, lng: $event.coords.lng}
      //     }
      //   if (this.markers.length == 2) {
      //     this.destination = {lat : $event.coords.lat, lng: $event.coords.lng}
      //     console.log(this.origin)
      //     console.log(this.destination)
      //     // this.markers = [];
      //     this.getDirection();
      //   }
      //     this.waypoints.push(
      //         {location: $event.coords.lat$event.coords.lng}
      //     )
      //     console.log(this.waypoints);
      // }

      // this.distance = this.calculateDistance(this.origin, this.destination)

  }
    calculateDistance(point1: { lat: number; lng: number; }, point2: { lat: number; lng: number; }) {
        const p1 = new google.maps.LatLng(
            point1.lat,
            point1.lng
        );
        const p2 = new google.maps.LatLng(
            point2.lat,
            point2.lng
        );
        return (
            google.maps.geometry.spherical.computeDistanceBetween(p1, p2)/1000
        ).toFixed(2);
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
