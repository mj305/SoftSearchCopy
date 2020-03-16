require 'rails_helper'
require 'user_data'

RSpec.describe JobApp, type: :model do
  
  subject {
    described_class.new(
      user_id: User.create(email:"blahblah@yahoo.com",password:"123456", employer:false).id,
      job_id: Job.create(
        position: "sr. dev",
        description: "Loremh",
        date: "02/03/2020",
        longitude: -80.2,
        latitude:45.1,
        user_id: User.create(email:"blah@yahoo.com",password:"123456", employer:true).id
                        ).id
                        )
  }  

  describe "Validations" do
    
    it "is valid with valid attributes" do 
      expect(subject).to be_valid
    end

    it "is not valid withoud a user_id" do
      subject.user_id = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without a job_id" do 
      subject.job_id = nil
      expect(subject).to_not be_valid
    end

    it "should not have multiple identical user_ids and job_ids" do 
      should validate_uniqueness_of(:user_id).scoped_to(:job_id)
    end
  end
end
