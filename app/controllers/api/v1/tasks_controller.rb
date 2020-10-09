module Api
	module V1
		class TasksController < ApplicationController
			# protect_from_forgery with: :null_session
			
			def create
				task = Task.new(task_params)
				puts request.format.json?

				if task.save
					render json: TaskSerializer.new(task).serialized_json
				else
					render json: {error: task.errors.messages}, status: 422
				end
			end
			
			def update
				task = Task.find(params[:id])

				if task.update(task_params)
					render json: TaskSerializer.new(task).serialized_json
				else
					render json: {error: task.errors.messages}, status: 422
				end
			end

			def destroy
				task = Task.find(params[:id])

				if task.destroy
					head :no_content
				else
					render json: {error: task.errors.messages}, status: 422
				end
			end
			
			private

			def task_params
				params.require(:task).permit(:description, :priority, :status, :deadline, :project_id)
			end
		end
	end
end