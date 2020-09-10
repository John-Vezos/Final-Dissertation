class AddPasswordToShapeOfInterests < ActiveRecord::Migration[5.1]
  def change
    add_column :shape_of_interests, :password, :string
  end
end
