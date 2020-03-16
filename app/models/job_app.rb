class JobApp < ApplicationRecord
  validates :user_id, uniqueness: { scope: :job_id }
  validates :status, presence: true, inclusion: { in: [-1,0,1] }
  attribute :status, :integer, default: 0
  belongs_to :user, -> { where employer:false }
  belongs_to :job
end
