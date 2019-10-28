FactoryBot.define do
  factory :message do
    body {Faker::Lorem.sentence}
    #imageはurlの文字列ではなくimageを実際に開く
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    user
    group
  end

end
