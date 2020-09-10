class CreateShapeOfInterests < ActiveRecord::Migration[5.1]
  def change
    create_table :shape_of_interests do |t|
      t.st_polygon :shape, null: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
