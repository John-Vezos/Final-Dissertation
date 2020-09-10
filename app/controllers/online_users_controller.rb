class OnlineUsersController < ApplicationController
															 # printUsers   includeShape   methonds aren't verify
	#protect_from_forgery except: [:printUsers, :create, :update]


	def create

		@onlineUser = OnlineUser.new
		@onlineUserLocation = params[:myGeolocation]

		# Load data ELSE create
		# user have got name but not location. when get location maybe other user have got this name.
		set_cookies(randomGenerateName) if OnlineUser.where(:name => cookies.signed[:user_name]).exists?			

		@onlineUser.name = cookies.signed[:user_name]
		@onlineUser.location = @onlineUserLocation
		@onlineUser.shape_of_interests = userIncludedInShapes(@onlineUserLocation)
		if user_signed_in?
			@onlineUser.user_id = current_user.id
		else
			@onlineUser.user_id = User.find_by(:name => "Guest").id
		end
		@onlineUser.save

		respond_to do |format|
      #format.html #looks for views/books/index.html.erb
      format.js   #looks for views/books/index.js.erb
    end
	end

	def update

		@onlineUserLocation = params[:myGeolocation]

		OnlineUser.where(:name => cookies.signed[:user_name]).update(:location => @onlineUserLocation, :shape_of_interests => userIncludedInShapes(@onlineUserLocation), :updated_at => DateTime.now)

		respond_to do |format|
      #format.html #looks for views/books/index.html.erb
      format.js   #looks for views/books/index.js.erb
    end
	end

	def printUsers
		@paramsPrintUsers = params[:shapeOfInterestId]
		
		@allOnlineUsersInShape = OnlineUser.joins(:users_shapes).where(users_shapes: { shape_of_interest_id: @paramsPrintUsers } ).where.not(:name => cookies.signed[:user_name])

		@onlineUsersCoordinates = []
		count = 0
		@allOnlineUsersInShape.each do |userInShape|
			@onlineUsersCoordinates[count] = userInShape.location.coordinates[0]
			@onlineUsersCoordinates[count + 1] = userInShape.location.coordinates[1]
			count = count + 2
		end

		@onlineUsersCoordinates = @onlineUsersCoordinates.to_json.html_safe
		
		respond_to do |format|
      #format.html #looks for views/books/index.html.erb
      format.js   #looks for views/books/index.js.erb
    end
	end

	private
	def getParams
		params.require(:online_user).permit(:location)
	end

	def userIncludedInShapes(value)
		return ShapeOfInterest.where("st_contains(shape_of_interests.shape, ST_GeomFromText('#{value}'))")
	end
	

end