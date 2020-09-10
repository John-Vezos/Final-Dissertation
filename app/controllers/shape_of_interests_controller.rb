class ShapeOfInterestsController < ApplicationController
	#skip_before_action :verify_authenticity_token
	#protect_from_forgery except: [ :delete] # printShapes methond it isn't verify

	def create

		@shapeOfInterest = ShapeOfInterest.new getParams

		if @shapeOfInterest.shape == nil
			return
		end


		if current_user != nil
			@shapeOfInterest.user_id = current_user.id
		else
			@shapeOfInterest.user_id = User.find_by(:name => "Guest").id
		end
	
		@shapeOfInterest.online_users = OnlineUser.where("st_contains(ST_GeomFromText('#{@shapeOfInterest.shape}'), online_users.location)")
		
		@password = randomGeneratePassword

		@shapeOfInterest.password = BCrypt::Password.create(@password, cost: 10)

		if @shapeOfInterest.save
			@noticeMessage = "Your shape created!"
		else
			@noticeMessage = "Oops! Something went wrong! Your shape did not saved!"
		end

		@noticeMessage = @noticeMessage.to_json.html_safe

		@newShapeId = @shapeOfInterest.id.to_json.html_safe

		@password = @password.to_json.html_safe

		respond_to do |format|
      #format.html #looks for views/books/create.html.erb
      format.js   #looks for views/books/create.js.erb
    end

	end

	def printShapes

		@paramPrintShapes = params[:value]

		@rectangles = []
		case @paramPrintShapes
		when "appShapes"
			@rectangles = User.third.shape_of_interest
		when "allShapes"
			@rectangles = ShapeOfInterest.all
		when "usersShapes"
			@rectangles = ShapeOfInterest.where.not(:user_id => 3)
		when "myShapes"
			@rectangles = current_user.shape_of_interest
		end
		
		@shapesCoordinates = []
		@shapesId = []
		count = 0
		@rectangles.each do |rectangle|
			@shapesCoordinates[count] = rectangle.id # id in first
			@shapesCoordinates[count + 1] = rectangle.shape.coordinates[0][0][0] 	#1:
			@shapesCoordinates[count + 2] = rectangle.shape.coordinates[0][1][0]	#3:
			@shapesCoordinates[count + 3] = rectangle.shape.coordinates[0][0][1]	#2:
			@shapesCoordinates[count + 4] = rectangle.shape.coordinates[0][2][1]	#6:
			count = count + 5
		end

		@rectangles = @rectangles.to_json.html_safe
		@shapesCoordinates = @shapesCoordinates.to_json.html_safe
		
		respond_to do |format|
      #format.html #looks for views/books/printShapes.html.erb
      format.js   #looks for views/books/printShapes.js.erb
    end
	end

	def delete

		@clickedShape = ShapeOfInterest.find(params[:shapeOfInterestId])
		@password = params[:password]
		


		# Admin and Administrator can delete all the shapes
		if current_user != nil and (@clickedShape.user_id == current_user.id or current_user.id == 2 or current_user.id == 3) or (@clickedShape.password != nil and BCrypt::Password.new(@clickedShape.password) == @password)
    	@clickedShape.destroy
    	@noticeMessage = "Your shape deleted!"
    else
    	@noticeMessage = "You can delete only your shapes!"
    end
    @noticeMessage = @noticeMessage.to_json.html_safe

    respond_to do |format|
      #format.html { redirect_to ponies_url }
      #format.json { head :no_content }
      format.js
    end
	end

	private
	def getParams
		params.require(:shape_of_interest).permit(:shape)
	end
end