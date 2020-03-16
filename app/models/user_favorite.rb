class UserFavorite < ApplicationRecord
  validates :user_id, uniqueness: { scope: :job_id } , presence: true
  validates :job_id, presence: true
  belongs_to :job, foreign_key: 'job_id'
  belongs_to :user, -> { where employer:false }, foreign_key: 'user_id' 
end
