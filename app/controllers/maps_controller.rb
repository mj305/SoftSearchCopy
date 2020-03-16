class MapsController < ApplicationController
    def show 
        @location = Geocoder.search(params['location']).first.coordinates
        puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! In the maps controller!!!!!!!!!!!!!#{@location}"
    end
end 