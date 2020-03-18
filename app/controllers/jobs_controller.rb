# frozen_string_literal: true

class JobsController < ApplicationController
  def index
    @jobs = Job.all
  end
end
