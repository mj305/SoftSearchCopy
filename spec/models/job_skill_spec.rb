require 'rails_helper'
require 'data'

RSpec.describe JobSkill, type: :model do
  include MetaData

  subject {
    described_class.new(
      job_id: MetaData::jobs(MetaData::employer.id)[1].id,
      skill_id: Skill.create(name: 'C++').id
                      )
  }

  describe "Validations" do
    
    it "is valid with valid attributes" do 
      expect(subject).to be_valid
    end

    it "is not valid without a job_id" do
      should validate_presence_of(:job_id)
    end

    it "is not valid without a skill_id" do
      should validate_presence_of(:skill_id)
    end

    it "should not have multiple identical job_ids and skill_ids" do 
      should validate_uniqueness_of(:job_id).scoped_to(:skill_id)
    end
  end

  describe "Job Associations" do
    
    it "should belong to a job" do
      should belong_to(:job).
      with_foreign_key('job_id') 
    end

    it "should be able to access the job associated with it" do
      expect(subject.job.position).to eq "jr. dev"
    end
  end

  describe "Skill Associations" do
    
    it "should belong to a skill" do
      should belong_to(:skill).
      with_foreign_key('skill_id') 
    end

    it "should be able to access the skill associated with it" do
      expect(subject.skill.name).to eq "C++"
    end
  end
end
