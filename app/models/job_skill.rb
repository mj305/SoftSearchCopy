class JobSkill < ApplicationRecord
  validates :job_id, uniqueness: { scope: :skill_id }, presence: true
  validates :skill_id, presence: true

  belongs_to :job, foreign_key: 'job_id'
  belongs_to :skill, foreign_key: 'skill_id'
end
