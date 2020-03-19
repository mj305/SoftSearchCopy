
export const usCenter = [-98.5795,39.8283] // center of the united states

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

export const allJobsOption = {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: usCenter,
    zoom: 4
}

export const options = center => {
    return{
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center,
            zoom: 6
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

export function pointFeature(point) {
    if(point.geometry) {
        point = {
            ...point.properties,
            longitude: point.geometry.coordinates[0],
            latitude: point.geometry.coordinates[1]
        }
    }
     if (!point.longitude) {
        point = {
            longitude: point[0],
            latitude: point[1]
        }
    }
    return(
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [point.longitude, point.latitude]
            },
            properties: { ...point }
        }
    )
}

export function geoJsonMarkers(jobJson) {
    

    const features = jobJson.map( ({job,skills}) => {
        job = { ...job, skills }
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