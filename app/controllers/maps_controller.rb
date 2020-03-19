class MapsController < ApplicationController
    def show 
        # @jobs = []
        location = params['location']

        # Job.all.each do |job|
        #     @jobs.push({
        #         job: job,
        #         skills: job.skills
        #     })
        # end


        coords = [-80.1918,25.7617]

        radius = 2000 # in km

        earth_radius = 6371 # in km

        # deg2rad = Math::PI/180

        # rad2deg = 180/Math::PI





        trial_run = Job.pluck(:longitude,:latitude).keep_if do |job|
            calc_dist(coords[0],coords[1],job[0],job[1]) <= 100
        end




        # first cut in degrees 

        # max_lat = miami_coords[1] + (radius/earth_radius)*(180.0/Math::PI)
        # min_lat = miami_coords[1] - (radius/earth_radius)*(180.0/Math::PI)

        # max_lon = miami_coords[0] + (Math.asin(radius/earth_radius) / Math.cos((Math::PI*miami_coords[1])/180.0))*(180.0/Math::PI)
        # min_lon = miami_coords[0] - (Math.asin(radius/earth_radius) / Math.cos((Math::PI*miami_coords[1])/180.0))*(180.0/Math::PI)


        # trial_run = Job.pluck(:id,:longitude,:latitude).keep_if do |job|
        #     job[1] <= max_lon && job[1] >= min_lon && 
        #     job[2] <= max_lat && job[2] >= min_lat
        # end















        if(location == "GET_ALL")
            @coords = ""
            @jobs = Job.all
        else
            coords = Geocoder.search("#{params['location']}")
            
            if coords.first
                p "THIS IS TRUE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #{}"
                @coords = coords.first.coordinates.reverse
                @jobs = Job.all
            else
                p "THIS IS FALSE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #{coords.first}"
                redirect_to root_path
            end
        end
    end

    private def calc_dist(lon1,lat1,lon2,lat2)
        lat1 = lat1*Math::PI/180            
        lat2 = lat2*Math::PI/180
        lon1 = lon1*Math::PI/180
        lon2 = lon2*Math::PI/180

        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = Math.sin(dlat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dlon/2)**2

        c = 2 * Math.asin(Math.sqrt(a))

        r = 3956
        return c*r
    end
end 