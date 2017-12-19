class Retweet < ActiveRecord::Base
    
    belongs_to :user
    belongs_to :post
    
    validates :user, presence: true, uniqueness: { scope: :post  }
    validates :post, presence: true    
    
end
