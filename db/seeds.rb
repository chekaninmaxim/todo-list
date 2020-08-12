# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

projects = Project.create([
	{
		title: "home tasks",
		description: "tasks that should be done at home"
	}
])

tasks = Task.create([
	{
		description: "water flowers",
		priority: "high",
		status: 1,
		deadline: '2020-12-12',
		project: projects.first
	},
	{
		description: "clean windows",
		priority: "low",
		status: 0,
		deadline: '2020-12-8',
		project: projects.first
	}
])