require 'rails_helper'
require 'user_data'


RSpec.describe User, type: :model do
  include UserData
  subject {
    described_class.new(
      email: "anything@gmail.com",
      password: "Loremh"
                        )
  }

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

  describe "Job Associations" do

    it "should be able to access its jobs" do
      employer_jobs = UserData::user_meta_data[2]
      expect(employer_jobs[0].position).to eq 'sr. dev'
    end

    it "destroy its corresponding jobs when destroyed" do
      employer_jobs = UserData::user_meta_data(0)[1]
      expect(employer_jobs.length).to eq 0
    end

    it "should have many jobs and destroy all associated jobs when destroyed" do
      should have_many(:jobs).dependent(:destroy) 
    end

  end

  describe "JobApp Associations" do 

    it "should not create a JobApp if employer: true" do 
      employer_user = UserData::employer
      employer_jobs = UserData::jobs(employer_user.id)
      expect(UserData::job_apps(employer_user.id,employer_jobs).length).to eq 0
    end

    it "should be able to access its job_apps" do 
      employee_job_apps = UserData::user_meta_data[4] 
      expect(employee_job_apps.length).to eq 2
    end

    it "should be able to access the job associated with the JobApp" do
      employee_job_apps = UserData::user_meta_data[4]
      expect(employee_job_apps[0].job.position).to eq 'sr. dev'
    end

    it "destroy its corresponding job_apps when destroyed" do
      user_job_apps = UserData::user_meta_data(1)[3]
      expect(user_job_apps.length).to eq 0
    end

    it "should have many job_apps and destroy all associated job_apps when destroyed"  do
      should have_many(:job_apps).dependent(:destroy) 
     end
  end


  describe "UserFavorite Associations" do

    it "should not create a UserFavorite if employer: true" do
      employer_user = UserData::employer
      employer_jobs = UserData::jobs(employer_user.id)
      expect(UserData::user_favs(employer_user.id,employer_jobs).length).to eq 0
    end

    it "should be able to access its user_favorites" do
      user_favorites = UserData::user_meta_data[3]
      expect(user_favorites.length).to eq 2
    end

    it "should be able to access the job associated with the UserFavorite" do
      user_favorites = UserData::user_meta_data[3]
      expect(user_favorites[0].job.position).to eq 'sr. dev'
    end

    it "destroy its corresponding user_favorites when destroyed" do
      user_favorites = UserData::user_meta_data(1)[2]
      expect(user_favorites.length).to eq 0
    end

    it "should have many user_favorites and destroy all associated user_favorites when destroyed" do
      should have_many(:user_favorites).dependent(:destroy) 
    end
  end
end
