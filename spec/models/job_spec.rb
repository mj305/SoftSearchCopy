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

    it "is not valid without a position, description, date, longitude, latitude, user_id" do
      should validate_presence_of(:position)
    end

    it "is not valid with a user_id that belongs to a user where employer:false" do
      employee
      subject.user_id = User.where(email:"employee@yahoo.com")[0].id
      expect(subject).to_not be_valid
    end
 
  #   it "is not valid without a email" do
  #     subject.email = nil
  #     expect(subject).to_not be_valid 
  #   end

  #   it "is not valid without a password" do
  #     subject.password = nil
  #     expect(subject).to_not be_valid
  #   end
  #   it "should have a unique email" do 
  #     should validate_uniqueness_of(:email).case_insensitive 
  #   end
  end
end
