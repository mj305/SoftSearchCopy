require 'rails_helper'

RSpec.describe User, type: :model do

  subject {
    described_class.new(
      email: "anything@gmail.com",
      password: "Loremh"
                        )
  }

  def employer
      User.create(
      email: "TESTINGemployer@gmail.com",
      password: "aaaaaa",
      employer: true
                      )
  end

  def employee
    User.create(
      email: "employee@gmail.com",
      password: "aaaaaa",
      employer: false
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
    Job.where(user_id: id)
  end

  def user_favs(id,job_ids)
    UserFavorite.create(
      user_id: id,
      job_id: job_ids[0].id
    )
    UserFavorite.create(
      user_id: id,
      job_id: job_ids[1].id
    )
    UserFavorite.where(user_id: id)
  end
  
  # if argument if 0 destroy employer, if 1 destroy employee
  def user_meta_data(destruction = nil)
    employer_user = employer
    employee_user = employee
    employer_jobs = jobs(employer_user.id)
    employee_favs = user_favs(employee_user.id,employer_jobs)

    case destruction
    when 0
      employer_user.destroy
      [employee_user,employer_user.jobs,employee_favs]
    when 1
      employee_user.destroy
      [employer_user,employer_jobs,employee_user.user_favorites]
    else
      [employer_user,employee_user,employer_jobs,employee_favs]
    end
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

  describe "Job Associations" do

    it "should be able to access its jobs" do
      employer_jobs = user_meta_data[2]
      expect(employer_jobs[0].position).to eq 'sr. dev'
    end

    it "destroy its corresponding jobs when destroyed" do
      employer_jobs = user_meta_data(0)[1]
      expect(employer_jobs.length).to eq 0
    end

    it "should have many jobs and destroy all associated jobs when destroyed" do
      should have_many(:jobs).dependent(:destroy) 
    end

    it "should have many job_apps and destroy all associated job_apps when destroyed"  do
      should have_many(:job_apps).dependent(:destroy) 
     end
  end


  describe "UserFavorite Associations" do # add a test to check that only employer:false users can favorite jobs

    it "it should not create a UserFavorite if employer: true" do
      employer_user = employer
      employee_user = employee
      employer_jobs = jobs(employer_user.id)
      expect(user_favs(employer_user.id,employer_jobs).length).to eq 0
    end

    it "should be able to access its user_favorites" do
      user_favorites = user_meta_data[3]
      expect(user_favorites.length).to eq 2
    end

    it "destroy its corresponding user_favorites when destroyed" do
      user_favorites = user_meta_data(1)[2]
      expect(user_favorites.length).to eq 0
    end

    it "should have many user_favorites and destroy all associated user_favorites when destroyed" do
      should have_many(:user_favorites).dependent(:destroy) 
    end
  end
end
