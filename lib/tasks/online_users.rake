namespace :online_users do
  desc "Delete records older than 60 minutes"
  task autoremove: :environment do
  	puts "Updating"
  	OnlineUser.where(['updated_at < ?', 60.minutes.ago]).update(shape_of_interests: [])
  	OnlineUser.where(['updated_at < ?', 60.minutes.ago]).destroy_all
  	puts "end"
  end

end
