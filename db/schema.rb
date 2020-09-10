# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181209142115) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "online_users", force: :cascade do |t|
    t.string "name", null: false
    t.geometry "location", limit: {:srid=>0, :type=>"st_point"}, null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_online_users_on_name", unique: true
    t.index ["user_id"], name: "index_online_users_on_user_id"
  end

  create_table "shape_of_interests", force: :cascade do |t|
    t.geometry "shape", limit: {:srid=>0, :type=>"st_polygon"}, null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password"
    t.index ["user_id"], name: "index_shape_of_interests_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_shapes", id: false, force: :cascade do |t|
    t.bigint "online_user_id"
    t.bigint "shape_of_interest_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["online_user_id"], name: "index_users_shapes_on_online_user_id"
    t.index ["shape_of_interest_id"], name: "index_users_shapes_on_shape_of_interest_id"
  end

  add_foreign_key "online_users", "users"
  add_foreign_key "shape_of_interests", "users"
  add_foreign_key "users_shapes", "online_users"
  add_foreign_key "users_shapes", "shape_of_interests"
end
