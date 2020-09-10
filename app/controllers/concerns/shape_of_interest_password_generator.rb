module ShapeOfInterestPasswordGenerator
	extend ActiveSupport::Concern

	def randomGeneratePassword
    string = [*('a'..'z'),*('0'..'9')].shuffle[0,16].join
    return string
  end

end