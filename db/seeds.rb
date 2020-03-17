# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# User.create_or_find_by!(email: "Elvis@gmail.com", password: "123456", employer:true)
# User.create_or_find_by!(email: "Iman@gmail.com", password: "0123456", employer:true)
# User.create_or_find_by!(email: "Chris@gmail.com", password: "12345sdfs6", employer:false)
# User.create_or_find_by!(email: "Leigh@gmail.com", password: "1234567", employer:true)
# User.create_or_find_by!(email: "Carolina@gmail.com", password: "12345sdfsd6", employer:false)
# User.create_or_find_by!(email: "Maria@gmail.com", password: "12345678", employer:true)
# User.create_or_find_by!(email: "Trystan@gmail.com", password: "12sdfs3456", employer:false)
# User.create_or_find_by!(email: "Shawn@gmail.com", password: "12345sdfs6", employer:false)


# Job.create_or_find_by!(position:"web dev",description: "aaa", date:"aaa",longitude: -80.2, latitude: 45.1, user_id:User.where(employer:true)[0].id)
# Job.create_or_find_by!(position:"front-end dev",description: "aaa", date:"aaa",longitude: -80.2, latitude: 45.1, user_id:User.where(employer:true)[1].id)
# Job.create_or_find_by!(position:"back-end dev",description: "aaa", date:"aaa",longitude: -80.2, latitude: 45.1, user_id:User.where(employer:true)[2].id)
# Job.create_or_find_by!(position:"devops dev",description: "aaa", date:"aaa",longitude: -80.2, latitude: 45.1, user_id:User.where(employer:true)[3].id)
# Job.create_or_find_by!(position:"game dev",description: "aaa", date:"aaa",longitude: -80.2, latitude: 45.1, user_id:User.where(employer:true)[0].id)

# UserFavorite.create_or_find_by!(user_id: User.where(email: "chris@gmail.com").ids[0] , job_id: Job.first.id)
# UserFavorite.create_or_find_by!(user_id: User.where(email: "shawn@gmail.com").ids[0], job_id: Job.second.id)
# UserFavorite.create_or_find_by!(user_id: User.where(email: "trystan@gmail.com").ids[0], job_id: Job.third.id)
# UserFavorite.create_or_find_by!(user_id: User.where(email: "carolina@gmail.com").ids[0], job_id: Job.fourth.id)
# UserFavorite.create_or_find_by!(user_id: User.where(email: "chris@gmail.com").ids[0], job_id: Job.fifth.id)

# 1000.times do 
#     User.create_or_find_by!(
#         email: Faker::Internet.email,
#         password: Faker::Lorem.characters(number:10),
#         employer: true
#     )
# end



10000.times do 
    latlng = Geocoder.search(Faker::Address.street_address).first

    next unless latlng

    latlng = latlng.coordinates
    
    employers = User.where(employer:true)

    Job.create_or_find_by!(
        position: Faker::Job.title,
        description: Faker::Lorem.paragraph,
        date: Faker::Date.backward(days: 120),
        longitude: latlng[1],
        latitude: latlng[0],
        user_id: employers[rand(1...employers.length)].id
    )
end
