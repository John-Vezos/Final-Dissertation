class ShapeOfInterest < ApplicationRecord
	# Association
  belongs_to :user

  #has_and_belongs_to_many :online_users
  has_many :users_shapes, dependent: :delete_all
	has_many :online_users, through: :users_shapes, dependent: :delete_all
end
