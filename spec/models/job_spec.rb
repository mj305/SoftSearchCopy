require 'rails_helper'

RSpec.describe Job, type: :model do

  subject {
    described_class.new(
      position: "anything@gmail.com",
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
