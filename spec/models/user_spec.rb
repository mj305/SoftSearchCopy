require 'rails_helper'

RSpec.describe User, type: :model do

  subject {
    described_class.new(
      email: "anything@gmail.com",
      password: "Loremh"
                        )
  }

  def create_employer
    employer = User.create(
    email: "employer@gmail.com",
    password: "Lodsfdsfremh",
    employer: true
                      )
  end

  def jobs(id)
    Job.create(
      position: "sr. dev",
      description: "Loremh",
      date: "02/03/2020",
      longitude: -80.2,
      latitude:45.1,
      user_id: id
                      )
    Job.create(
      position: "jr. dev",
      description: "Lsdfsdfsforemh",
      date: "01/03/2020",
      longitude: -80.2,
      latitude:45.1,
      user_id: id
                      )
  end


  describe "Validations" do
    it "is valid with valid attributes" do 
      expect(subject).to be_valid
    end

    it "is not valid without a email" do
      subject.email = nil
      expect(subject).to_not be_valid 
    end

    it "is not valid without a password" do
      subject.password = nil
      expect(subject).to_not be_valid
    end
    it "should have a unique email" do 
      should validate_uniqueness_of(:email).case_insensitive 
    end
  end

  describe "Associations" do

    it "should be able to access its jobs" do
      jobs(create_employer.id)
      user = User.where(email: "employer@gmail.com")[0]
      expect(user.jobs[0].position).to eq 'sr. dev'
    end

    it "should have many jobs and destroy all associated jobs when destroyed" do
      should have_many(:jobs).dependent(:destroy) 
    end

    it "should have many user_favorites and destroy all associated user_favorites when destroyed" do
      should have_many(:user_favorites).dependent(:destroy) 
    end

    it "should have many job_apps and destroy all associated job_apps when destroyed"  do
      should have_many(:job_apps).dependent(:destroy) 
     end
  end
end
