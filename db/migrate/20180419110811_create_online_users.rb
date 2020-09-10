class CreateOnlineUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :online_users do |t|
      t.string :name, null: false
      t.st_point :location, null: false
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :online_users, :name, unique: true
  end
end
