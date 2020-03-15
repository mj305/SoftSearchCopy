require 'rails_helper'
require 'user_data'

RSpec.describe Job, type: :model do
  include UserData
  subject {
    described_class.new(
      position: "sr. dev",
      description: "Loremh",
      date: "02/03/2020",
      longitude: -80.2,
      latitude:45.1,
      user_id: User.create(email:"blah@yahoo.com",password:"123456", employer:true).id 
                      )
  }

  describe "Validations" do
    
    it "is valid with valid attributes" do 
      expect(subject).to be_valid
    end

    it "is not valid without a position" do
      should validate_presence_of(:position)
    end

    it "is not valid without a description" do
      should validate_presence_of(:description)
    end

    it "is not valid without a date" do
      should validate_presence_of(:date)
    end

    it "is not valid without a longitude" do
      should validate_presence_of(:longitude)
    end

    it "is not valid without a latitude" do
      should validate_presence_of(:latitude)
    end

    it "is not valid without a user_id" do
      should validate_presence_of(:user_id)
    end

    it "is not valid with a user_id that belongs to a user where employer:false" do
      employee_user = UserData::employee
      employee_jobs = UserData::jobs(employee_user.id)
      expect(employee_jobs.length).to eq 0
    end
  end


  describe "User Associations" do
    
    it "should belong to a unique user where { employer: true }" do
      should belong_to(:user).
      with_foreign_key('user_id').
      conditions(employer:true) 
    end

    it "should be able to access its poster" do
      expect(subject.user.email).to eq "blah@yahoo.com"
    end

    it "should have many user_favorites and destroy all associated user_favorites when destroyed" do
      should have_many(:user_favorites).dependent(:destroy) 
    end

    it "should have many job_apps and destroy all associated job_apps when destroyed"  do
      should have_many(:job_apps).dependent(:destroy) 
    end  
  end
end
