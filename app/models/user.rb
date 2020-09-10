class User < ApplicationRecord
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # not allowed blank name
 	validates_presence_of :name

  # Association
  has_many :shape_of_interest
  has_many :online_user

 	# reserved name on create/update
 	validates :name, uniqueness: true, on: :create
 	validates :name, uniqueness: true, on: :update

 	# name length 2 ~ 15
 	validates_length_of :name, :in => 2..15

 	# name allowed only characters and numbers and not the special name "Guest" as first
 	validates_each :name do |record, attr, value|
    record.errors.add(attr, 'must include only characters and numbers') unless value =~  /\A[a-z][a-z0-9]*[ ]?[a-z0-9]*\z/i
    record.errors.add(attr, 'cannot have as first the "Guest"') if value =~  /\A[G|g][U|u][E|e][S|s][T|t][a-z0-9]+[ ]?[a-z0-9]*\z/i
    record.errors.add(attr, 'cannot have as first the "Guest"') if value =~  /\A[G|g][U|u][E|e][S|s][T|t][ ][a-z0-9]*\z/i
    #record.errors.add(attr, 'cannot have as first the "Admin"') if value =~  /\A[A|a][D|d][M|m][I|i][N|n][a-z0-9]+[ ]?[a-z0-9]*\z/i
    record.errors.add(attr, 'cannot have as first the "Admin"') if value =~  /\A[A|a][D|d][M|m][I|i][N|n][ ][a-z0-9]*\z/i
    record.errors.add(attr, 'cannot have as first the "Administrator"') if value =~  /\A[A|a][D|d][M|m][I|i][N|n][I|i][S|s][T|t][R|r][A|a][T|t][O|o][R|r][a-z0-9]+[ ]?[a-z0-9]*\z/i
    record.errors.add(attr, 'cannot have as first the "Administrator"') if value =~  /\A[A|a][D|d][M|m][I|i][N|n][I|i][S|s][T|t][R|r][A|a][T|t][O|o][R|r][ ][a-z0-9]*\z/i
  end

 	# name start with upper case
 	validates_each :name do |record, attr, value|
    record.errors.add(attr, 'must start with upper case') if value =~ /\A[[:lower:]]/
  end
  
end
