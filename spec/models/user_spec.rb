require 'rails_helper'

RSpec.describe User, type: :model do

  subject {
    described_class.new(email: "Anything@gmail.com",
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
  end

  describe "Associations" do
    it "should have many jobs if employer:true" do
     should have_many(:jobs) # should check if employer is true in job test
    end
  end
end
