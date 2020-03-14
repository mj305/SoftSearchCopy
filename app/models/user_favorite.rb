class UserFavorite < ApplicationRecord
  validates :user, uniqueness: { scope: :job }
  belongs_to :job
  belongs_to :user, -> { where employer:false } 
end
