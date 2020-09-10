class CreateUsersShapes < ActiveRecord::Migration[5.1]
  def change
    create_table :users_shapes, id: false do |t|
    	#t.belongs_to :online_user, index: true
    	#t.belongs_to :shape_of_interest, index: true

    	t.references :online_user, foreign_key: true
    	t.references :shape_of_interest, foreign_key: true

      t.timestamps
    end
  end
end
