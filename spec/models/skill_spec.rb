require 'rails_helper'
require 'data'

RSpec.describe Skill, type: :model do
  include MetaData

  subject {
    described_class.new(
        name: 'C++'
                      )
  }

  describe "Validations" do
    
    it "is valid with valid attributes" do 
      expect(subject).to be_valid
    end

    it "is not valid without a name" do
      should validate_presence_of(:name)
    end

    it "should be unique" do 
      should validate_uniqueness_of(:name)
    end
  end

  describe "JobSkill Associations" do

    it "should have many job_skills and destroy all associated job_skills when destroyed"  do
      should have_many(:job_skills).dependent(:destroy) 
     end
  end
end
