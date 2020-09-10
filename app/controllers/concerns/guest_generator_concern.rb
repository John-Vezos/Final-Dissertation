module GuestGeneratorConcern
	extend ActiveSupport::Concern

	def randomGenerateName
    # Guest name is secret
    loop do
      # random number 1 ~ 10.000
      @counter = 1 + Random.rand(10000)
      # name is Guest Guest####
      @username = "Guest Guest" + @counter.to_s
      break if !User.where(:name => @username).exists?
    end
    return @username
  end

  def set_cookies(username)
    cookies.permanent.signed[:user_name]   = { value: @username, expires: 1.hour.from_now }
  end

end