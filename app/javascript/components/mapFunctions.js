
export const flyToProps = { speed: 0.5, zoom: 6, bearing: 0, pitch: 0 };


export const geoLocationOptions = {
    positionOptions: {
        enableHighAccuracy: false
    },
    trackUserLocation: false,
    showAccuracyCircle: false,
    fitBoundsOptions: {
        maxZoom: 6
    }
}

export const MARKER_LAYER = {
    id: 'markers',
    type: 'symbol',
    source: 'markers',
    layout: {
      'icon-image': 'JobPic',
      'icon-size': 0.25,
      'icon-allow-overlap': true
    }
  };

export  const SEARCH_LAYER = {
    id: 'search',
    type: 'symbol',
    source: 'search',
    layout: {
      'icon-image': 'SearchPin',
      'icon-size': 0.5,
      'icon-allow-overlap': true
    }
  };

export function filterGeoJsonPoints(search,points) {
    var center = search;
    var radius = 100;
    var options = {steps: 64, units: 'miles', properties: {foo: 'bar'}};
    var circle = turf.circle(center, radius, options);

    var filteredPoints = turf.pointsWithinPolygon(points, circle).features
    // console.log(filteredPoints)
    // setFilteredJobs(filteredPoints)
    return(filteredPoints)
}


export function pointFeature(point) {
    return(
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [point.longitude, point.latitude]
            },
            properties: {...point}
        }
    )
}

export function geoJsonMarkers(jobJson) {
    const features = jobJson.map( job => {
        return pointFeature(job)
        })

    return {
        type: 'FeatureCollection',
        features
    }
}


export function onLoad(MAP, search, points, ...pics) {
    MAP.on('load', () => {
        MAP.loadImage(pics[0], (error, image) => {
            if (error) throw error
            MAP.addImage('JobPic', image)
        })
        MAP.addSource('markers', {type: 'geojson', data: {
            type: 'FeatureCollection',
            features: points
        } })
        MAP.addLayer(MARKER_LAYER)

        
        MAP.loadImage(pics[1], (error, image) => {
            if (error) throw error
            MAP.addImage('SearchPin', image)
        })
        MAP.addSource('search', {type: 'geojson', data:    {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: search
            },
            properties: {foo: 'bar'}
        }})
        MAP.addLayer(SEARCH_LAYER)
    })
}