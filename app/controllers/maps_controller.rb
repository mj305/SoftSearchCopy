class MapsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def show 
        location = params['location']
        coords = [-80.1918,25.7617]

        if(location == "GET_ALL")
            @jobs = { job_data: Job.append_skills(Job.all), coords: [-98.5795,39.8283] }
        else
            @jobs = geoCode(location)
        end
    end

    def jobs
        location = params['location']
        respond_to do |format|
            format.json do
                if(location == 'GET_ALL')
                    render json: { job_data: Job.append_skills(Job.all), coords: [-98.5795,39.8283] }
                else
                    render json: geoCode(location)
                end
            end
        end
    end

    # def filter
    #     current_jobs = []
    #     currentJobs = params['filteredJobs']
    #     currentSkill = params['skillToFilter']
    #     currentJobs.each do |job|
    #         job['properties']['skills'].each do |skill|
    #             if(skill['name'] == currentSkill)
    #                 current_jobs.push({ job: job['properties'], skills: job['properties']['skills']})
    #                 break
    #             end
    #         end
    #      end
    #     render json: { job_data: current_jobs, coords: params['coords']}
    # end

    # def unfilter
    #     current_job_ids = []
    #     currentJobs = params['jobs']['job_data']
    #     currentSkill = params['skillToUnfilter']
    #     unfiltered_jobs = []

    #     currentJobs.each do |job| 
    #         current_job_ids.push(job['job']['id'])
    #     end
        
    #      currentJobs = Job.where(id: current_job_ids )

    #      currentJobs.each do |job|
    #         if(!job.skills.exists?(name: currentSkill))
    #             unfiltered_jobs.push({job: job['properties'], skills: job['skills'] })
    #         end
    #      end

    #     render json: { job_data: unfiltered_jobs, coords: params['jobs']['coords']}
    # end

    private def geoCode(location)
        coords = Geocoder.search("#{location}")
        if coords.first
            @coords = coords.first.coordinates.reverse
            jobs = Job.all.select { |job| Job.calc_dist(@coords[0],@coords[1],job.longitude,job.latitude) <= 100 }
            @jobs = Job.append_skills(jobs)
            { job_data: @jobs, coords: @coords }
        else
            redirect_to root_path
        end
    end
end 