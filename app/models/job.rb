class Job < ApplicationRecord
  belongs_to :user, -> { where employer: true }
  validates :position,:description,:date,:longitude,:latitude, presence: true
  # validates :description, presence: true
  
end
