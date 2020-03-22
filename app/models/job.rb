class Job < ApplicationRecord
  validates :position,:description,:longitude,:latitude,:user_id, presence: true  
  belongs_to :user, -> { where employer: true }, foreign_key: 'user_id'
  has_many :user_favorites, dependent: :destroy
  has_many :job_apps, dependent: :destroy
end
 