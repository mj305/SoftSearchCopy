class JobApp < ApplicationRecord
  validates :user, uniqueness: { scope: :job }
  validates :status, presence: true, inclusion: { in: [-1,0,1] }
  belongs_to :user, -> { where employer:false }
  belongs_to :job
end
