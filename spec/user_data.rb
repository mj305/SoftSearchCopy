module UserData
    
    def self.employer
        User.create(
        email: "TESTINGemployer@gmail.com",
        password: "aaaaaa",
        employer: true
                        )
    end

    def self.employee
        User.create(
            email: "employee@gmail.com",
            password: "aaaaaa",
            employer: false
                            )
    end

    def self.jobs(id)
    Job.create(
        position: "sr. dev",
        description: "Loremh",
        date: "02/03/2020",
        longitude: -80.2,
        latitude:45.1,
        user_id: id
                        )
    Job.create(
        position: "jr. dev",
        description: "Lsdfsdfsforemh",
        date: "01/03/2020",
        longitude: -80.2,
        latitude:45.1,
        user_id: id
                        )
    Job.where(user_id: id)
    end

    def self.job_apps(id,job_ids)
    JobApp.create(
        user_id: id,
        job_id: job_ids[0].id
    )
    JobApp.create(
        user_id: id,
        job_id: job_ids[1].id,
        status: 1
    )
    JobApp.where(user_id: id)
    end

    def self.user_favs(id,job_ids)
    UserFavorite.create(
        user_id: id,
        job_id: job_ids[0].id
    )
    UserFavorite.create(
        user_id: id,
        job_id: job_ids[1].id
    )
    UserFavorite.where(user_id: id)
    end

    # if argument if 0 destroy employer, if 1 destroy employee, if 2 destroy employer_jobs.first
    def self.user_meta_data(destruction = nil)
        employer_user = employer
        employee_user = employee
        employer_jobs = jobs(employer_user.id)
        employee_favs = user_favs(employee_user.id,employer_jobs)
        employee_apps = job_apps(employee_user.id,employer_jobs)

        case destruction
        when 0
            employer_user.destroy
            employer_jobs.all
        when 1
            employee_user.destroy
            [employee_favs,employee_apps]
        when 2
            employer_jobs.destroy_all
            [employee_apps,employee_favs]
        else
            [employer_user,employee_user,employer_jobs,employee_favs,employee_apps]
        end
    end
end