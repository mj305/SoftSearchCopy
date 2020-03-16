class MapsController < ApplicationController
    def show 
        @location = Geocoder.search(params['location']).first.coordinates
        @API_KEY = ENV['MAPBOX_KEY']
        puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! In the maps controller!!!!!!!!!!!!!#{@location}"
    end
end 