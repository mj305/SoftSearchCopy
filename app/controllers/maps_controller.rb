class MapsController < ApplicationController
    def show 
        coords = Geocoder.search("#{params['location']}")
        
        if coords.first
            p "THIS IS TRUE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #{coords.first}"
            @coords = coords.first.coordinates.reverse
            @jobs = Job.all
        else
            p "THIS IS FALSE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #{coords.first}"
            redirect_to root_path
        end
    end
end 