class Skill < ApplicationRecord
    validates: :name, presence: true, uniqueness: true
    has_many :job_skills, dependent: :destroy
end
