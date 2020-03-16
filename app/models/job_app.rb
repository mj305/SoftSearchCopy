class JobApp < ApplicationRecord
  validates :user_id, uniqueness: { scope: :job_id }, presence: true
  validates :job_id, presence: true
  validates :status, presence: true, numericality: 
                                    { only_integer: true, 
                                    greater_than_or_equal_to: -1, 
                                    less_than_or_equal_to: 1 }
  attribute :status, :integer, default: 0
  belongs_to :user, -> { where employer:false }, foreign_key: 'user_id'
  belongs_to :job
end
