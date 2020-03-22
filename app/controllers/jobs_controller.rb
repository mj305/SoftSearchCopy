# frozen_string_literal: true

class JobsController < ApplicationController
  def index
    @jobs = Job.all
  end
  def show
    @job = Job.find(params[:id])
  end
  def new
    @job = Job.new
  end
  def create
    job = Job.new(job_params)
    if job.save
      redirect_to job
   else
      redirect_to new_job_path, alert:job.errors.full_messages.to_sentence
   end
  end

  private

  def job_params
     params.require(:job).permit(:description, :position, :longitude, :latitude, :user_id)
  end
end
