class Job < ApplicationRecord
  belongs_to :user, -> { where employer: true }
  has_many :user_favorites
  validates :position,:description,:date,:longitude,:latitude, presence: true  
end
 