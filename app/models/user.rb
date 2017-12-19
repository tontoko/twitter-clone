class User < ActiveRecord::Base
    
    validates :user_id, presence: true, uniqueness: true
    validates :name, presence: true
    
    has_secure_password
    
    has_many :likes, dependent: :destroy
    has_many :posts, dependent: :destroy
    has_many :retweets, dependent: :destroy
    has_many :follows, dependent: :destroy
    
end
