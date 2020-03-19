class Job < ApplicationRecord
  validates :position,:description,:date,:longitude,:latitude,:user_id, presence: true  
  belongs_to :user, -> { where employer: true }, foreign_key: 'user_id'
  has_many :user_favorites, dependent: :destroy
  has_many :job_apps, dependent: :destroy
  has_many :job_skills, dependent: :destroy
  has_many :skills, through: :job_skills

  # function that calculates distance between two points 
  # on a spherical surface
  def self.calc_dist(lon1,lat1,lon2,lat2)
    deg2rad = Math::PI/180

    lat1 = lat1*deg2rad            
    lat2 = lat2*deg2rad
    lon1 = lon1*deg2rad
    lon2 = lon2*deg2rad

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = Math.sin(dlat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dlon/2)**2
    c = 2 * Math.asin(Math.sqrt(a))
    r = 3956 # earth radius in miles
    return c*r
  end

  def self.append_skills(jobs)
    jobs_and_skills = []
    jobs.each do |job| 
        jobs_and_skills.push({
            job: job,
            skills: job.skills
        })
    end
    jobs_and_skills
  end
end
 