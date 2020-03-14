class Job < ApplicationRecord
  validates :position,:description,:date,:longitude,:latitude, presence: true  
  belongs_to :user, -> { where employer: true }
  has_many :user_favorites, dependent: :destroy
end
 