class PagesController < ApplicationController

  def home
    # get client IP
    @username = "Unknown"

    # user isn't loged in
  	if !user_signed_in?
      # firstime here
      @user_name = cookies.signed[:user_name]
      if (@user_name == nil || @user_name.split.first != "Guest")

        # call randomGenerate
        randomGenerateName
        
        update(@username)
        set_cookies(@username)
      else
        @username = @user_name
      end
  	else
      # Log in account comes here 
  		@username = current_user.name
      update(@username)
      set_cookies(@username)
  	end
    
    # Users see only the first Guest
    @username = @username.split.first
  end

  def about
    @users = User.all
  end

  def contact
    @lala = User.where("name like ?", "%John %")
  end

 

  private
  def update(username)
    if OnlineUser.where(:name => cookies.signed[:user_name]).exists?
      @backup = OnlineUser.where(:name => cookies.signed[:user_name])
      @userId = 1
      if @username.split.first != "Guest"
        @userId = User.find_by(:name => @username).id
      end
      # Same user from different devises. Save only one entity.
      if OnlineUser.where(:name => @username, :user_id => @userId).exists?
        @backup.update(shape_of_interests: [])
        @backup.destroy_all
      else
        @backup.update(:name => @username, user_id: @userId)
      end
    end
  end

  # Cookies methods

  def delete_cookies
    cookies.delete :user_name
  end
  
end
