require 'rails_helper'

RSpec.describe Job, type: :model do

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
  def employee
    User.create(
      email:"employee@yahoo.com",
      password:"123fsdfsdf456", 
      employer:false)
      .id               
  end

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
      employee
      subject.user_id = User.where(email:"employee@yahoo.com")[0].id
      expect(subject).to_not be_valid
    end
  end


  describe "Associations" do
    
    it "should belong to a unique user where { employer: true }" do
      should belong_to(:user).
      with_foreign_key('user_id').
      conditions(employer:true) 
    end

    it "should be able to access its user" do
      expect(subject.user).to be_valid         # check this one
    end

    it "should have many user_favorites and destroy all associated user_favorites when destroyed" do
      should have_many(:user_favorites).dependent(:destroy) 
    end

    it "should have many job_apps and destroy all associated job_apps when destroyed"  do
      should have_many(:job_apps).dependent(:destroy) 
    end  
  end
end
