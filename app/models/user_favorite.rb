class UserFavorite < ApplicationRecord
  belongs_to :job
  belongs_to :user, -> { where employer:false }
  
end
