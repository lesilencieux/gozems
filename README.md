# requierment
git 
npm : 6.13.X or hightler 
node : 14.15.5 or hightler

# instructioon to start the service
# just run this commant
Firstly clone this repository on gitub

$ git clone -b master https://github.com/lesilencieux/gozems.git

$ cd gozems
$ npm run dev

# To test the service after starting use the following json in body 

url :  localhost:5000/api/distance_and_time

{
 "start": { "lat": 7.9039238, "lng": -3.2754336 },
 "end": { "lat": 9.3057654, "lng": 0.0643703 },
 "units": "metric"
 }
 # You must see this answer like the response

{
    "start": {
        "country": "Côte d'Ivoire",
        "timezone": "GMT+-1",
        "location": {
            "lat": 7.9039238,
            "lng": -3.2754336
        }
    },
    "end": {
        "country": "Ghana",
        "timezone": "GMT+-1",
        "location": {
            "lat": 9.3057654,
            "lng": 0.0643703
        }
    },
    "distance": {
        "value": "545 ",
        "units": "km"
    },
    "time_diff": {
        "value": 0,
        "units": "hours"
    }
}