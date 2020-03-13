class UserFavorite < ApplicationRecord
  belongs_to :user, -> { where employer:false }
  belongs_to :job
end
