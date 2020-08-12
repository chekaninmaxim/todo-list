class ProjectSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description

  has_many :tasks
end
