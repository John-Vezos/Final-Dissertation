class OnlineUser < ApplicationRecord
	# Association
	belongs_to :user

	#has_and_belongs_to_many :shape_of_interests
	has_many :users_shapes
	has_many :shape_of_interests, through: :users_shapes
end
