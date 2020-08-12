class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :description, :priority, :status, :deadline, :project_id
end
