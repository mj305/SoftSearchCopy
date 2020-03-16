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
      employer_user = UserData::user_meta_data[0]
      employer_job = employer_user.jobs[0]
      expect(employer_job.position).to eq 'sr. dev'
    end

    it "destroy its corresponding jobs when destroyed" do
      jobs = UserData::user_meta_data(0)
      expect(jobs.length).to eq 0
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
      employee_user = UserData::user_meta_data[1]
      expect(employee_user.job_apps.length).to eq 2
    end

    it "should be able to access the job associated with the JobApp" do
      employee_user = UserData::user_meta_data[1]
      employee_job_app = employee_user.job_apps[0]
      expect(employee_job_app.job.position).to eq 'sr. dev'
    end

    it "destroy its corresponding job_apps when destroyed" do
      user_job_apps = UserData::user_meta_data(1)[1]
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
      employee_user = UserData::user_meta_data[1]
      expect(employee_user.user_favorites.length).to eq 2
    end

    it "should be able to access the job associated with the UserFavorite" do
      employee_user = UserData::user_meta_data[1]
      user_favorite = employee_user.user_favorites[0]
      expect(user_favorite.job.position).to eq 'sr. dev'
    end

    it "destroy its corresponding user_favorites when destroyed" do
      user_favorites = UserData::user_meta_data(1)[0]
      expect(user_favorites.length).to eq 0
    end

    it "should have many user_favorites and destroy all associated user_favorites when destroyed" do
      should have_many(:user_favorites).dependent(:destroy) 
    end
  end
end
