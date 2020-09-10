class UsersShape < ApplicationRecord
	# Association
	belongs_to :online_user
	belongs_to :shape_of_interest
end
