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


        trial_run = Job.all.select { |job| Job.calc_dist(coords[0],coords[1],job.longitude,job.latitude) <= 100 }



        if(location == "GET_ALL")
            @coords = ""
            @jobs = Job.all
        else
            coords = Geocoder.search("#{params['location']}")
            
            if coords.first
                p "THIS IS TRUE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #{trial_run}"
                @coords = coords.first.coordinates.reverse
                @jobs = Job.all
            else
                p "THIS IS FALSE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #{coords.first}"
                redirect_to root_path
            end
        end
    end
end 