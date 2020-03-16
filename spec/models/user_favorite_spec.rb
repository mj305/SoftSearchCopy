require 'rails_helper'
require 'user_data'

RSpec.describe UserFavorite, type: :model do
  include UserData
  
  subject {
    described_class.new(
      user_id: User.create(email:"blahblah@yahoo.com",password:"123456", employer:false).id,
      job_id: Job.create(
        position: "sr. dev",
        description: "Loremh",
        date: "02/03/2020",
        longitude: -80.2,
        latitude:45.1,
        user_id: User.create(email:"blah@yahoo.com",password:"123456", employer:true).id
                        ).id
                        )
  }  

end
