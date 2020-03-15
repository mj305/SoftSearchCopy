require 'rails_helper'

RSpec.describe User, type: :model do

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
    it do 
      should validate_uniqueness_of(:email).case_insensitive 
    end
  end

  describe "Associations" do
    it "should have many jobs" do
     should have_many(:jobs) # should check if employer is true in job test
    end

    it "destroy all associated jobs when destroyed" do
      should have_many(:jobs).dependent(:destroy) 
    end

    it "should have many user_favorites" do
      should have_many(:user_favorites) 
    end

    it "destroy all associated user_favorites when destroyed" do
      should have_many(:user_favorites).dependent(:destroy) 
    end

    it "should have many job_apps" do
      should have_many(:job_apps) 
     end

    it "destroy all associated job_apps when destroyed" do
      should have_many(:job_apps).dependent(:destroy) 
    end
  end
end
