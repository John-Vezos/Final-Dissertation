class UsersController < ApplicationController
	def destroy
	  @user = User.find(params[:id])
	  set_cookies(randomGenerateName)
	  @guestId = User.find_by(:name => "Guest").id
	  @user.online_user.update(user_id: @guestId, :name => cookies.signed[:user_name])
	  @user.shape_of_interest.update_all(user_id: @guestId);
	  @user.destroy

	  respond_to do |format|
	  	format.html { redirect_to root_url, notice: "User deleted." }
	  end
	end
end